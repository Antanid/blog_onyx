import style from "./style/style.module.scss";
import { useGetSingleDataQuery, useNewCommentMutation } from "@/redux/singleApi";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";

import likeImg from "../../public/likeImg.png";
import defautlImg from "../../public/defaultAvatar.png";
import { useSession } from "next-auth/react";
import { clearCache, getCurrentTime } from "@/utils";
import SingleTittle from "@/components/Single/SingleTittle";
import SingleMainText from "@/components/Single/SingleMainText";
import SingleLikesDate from "@/components/Single/SingleLikesDate";
import CommentsForm from "@/components/Single/CommentsForm";
import NoComents from "@/components/Single/NoComents";
import CommentsList from "@/components/Single/CommentsList";

export interface commentsType {
  name: string;
  id: string;
  role: string;
  text: string;
  image?: string;
  time: string;
}
[];

const SinglePage = () => {
  const [text, setText] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const { data = [], isLoading } = useGetSingleDataQuery(id);
  const { data: session } = useSession();
  const [mutate] = useNewCommentMutation();

  function clearForm() {
    setText("");
  }

  function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  const newCommentPost = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newComent = {
      text: text,
      name: session?.user?.name || "",
      image: session?.user?.image || "",
      id: String(data.comments.length + 1),
      time: getCurrentTime(),
    };

    const newData = {
      title: data.title,
      mainText: data.mainText,
      date: data.date,
      likes: data.likes,
      timePost: data.timePost,
      id: data.id,
      comments: [...data.comments, newComent],
    };

    if (text.length > 0) {
      try {
        const t = await mutate({ newData: newData, id: id });
        await clearForm();
        clearCache();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={style.singlePage}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={style.singlePage_info}>
          <SingleTittle title={data.title} />
          <SingleMainText mainText={data.mainText} />
          <SingleLikesDate likeImg={likeImg} likes={data.likes} date={data.date} />
          <div className={style.single_div_comments}>
            Comments
            {session && (
              <CommentsForm
                text={text}
                onChangeText={onChangeText}
                clearForm={clearForm}
                newCommentPost={newCommentPost}
              />
            )}
            {data.comments.length === 0 ? (
              <NoComents />
            ) : (
              <CommentsList
              defautlImg={defautlImg}
              data={data}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
