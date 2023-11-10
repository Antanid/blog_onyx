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

interface commentsType {
  name: string;
  id: string;
  role: string;
  text: string;
  image?: string;
  time: string;
}[];

const SinglePage = () => {
  const [text, setText] = useState("");

  const router = useRouter();
  const { id } = router.query;
  const { data = [], isLoading } = useGetSingleDataQuery(id);
  const { data: session } = useSession();
  const [mutate] = useNewCommentMutation();

  function onChangeText(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
  }

  const newCommentPost = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newComent = {
      text: text,
      name: session?.user?.name || '',
      image: session?.user?.image || '',
      id: String(data.comments.length + 1),
      time: getCurrentTime()
    };

    const newData = {
      title: data.title,
      mainText: data.mainText,
      date: data.date,
      likes: data.likes,
      id: data.id,
      comments: [...data.comments, newComent]
    };

    if (text.length > 0) {
      try {
       const t =  await mutate({newData: newData,  id: id });
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
          <div className={style.singlePage_info_title}>
            <h1>{data.title}</h1>
          </div>
          <div className={style.singlePage_info_main}>
            <p>{data.mainText}</p>
          </div>
          <div className={style.single_div_data_like}>
            <div className={style.single_div_button}>
              <button>
                <Image src={likeImg} alt="likeImg" width={30} height={30} layout="fixed" />
              </button>
              <p>{data.likes}</p>
            </div>
            <div className={style.single_div_data}>
              <p>{data.date}</p>
            </div>
          </div>
          <div className={style.single_div_comments}>
            Comments
            <form className={style.single_div_comments_textareaBlock}>
              <textarea value={text} onChange={onChangeText} cols={30} rows={10} />
              <div className={style.single_div_comments_textareaBlock_button}>
                <button
                  onClick={() => setText("")}
                  className={style.single_div_comments_textareaBlock_clear}
                >
                  Clear area
                </button>
                <button
                  onClick={newCommentPost}
                  className={style.single_div_comments_textareaBlock_post}
                >
                  Post
                </button>
              </div>
            </form>
            {data.comments.length === 0 ? (
              <div className={style.single_div_comments_textareaBlock_noComments}>
                <p>No comments</p>
              </div>
            ) : (
              <ul className={style.single_div_comments_textareaBlock_ul}>
                {[...data.comments].reverse().map((i: commentsType) => (
                  <li key={i.id}>
                    <div className={style.single_div_comments_textareaBlock_li_name}>
                      <div className={style.single_div_comments_imgName}>
                        <Image
                          src={i.image || defautlImg}
                          width={50}
                          height={50}
                          alt="logoImg"
                          layout="intrinsic"
                        />
                        <p className={style.single_div_comments_name}>{i.name}</p>
                      </div>

                      <div className={style.single_div_comments_textareaBlock_li_comments}>
                        <h5>{i.text}</h5>
                      </div>
                    </div>
                    <div className={style.single_div_comments_role_time}>
                      <p>{i.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
