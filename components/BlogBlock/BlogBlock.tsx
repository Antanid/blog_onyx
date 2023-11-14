import style from "./style/style.module.scss";
import Image from "next/image";
import Link from "next/link";

import likeImg from "../../public/likeImg.png";
import editImg from "../../public/editImg.png";
import deleteImg from "../../public/deleteImg.png";
import BlogTittle from "./BlogTittle";
import BlogMainText from "./BlogMainText";
import BlogInfoPanel from "./BlogInfoPanel";
import BlogUnderline from "./BlogUnderline";
import { sessionType } from "@/utils/type";

type BlogBlockType = {
  title: string;
  mainText: string;
  date: string;
  likes: number;
  id: string;
  onDelete: (id: string) => void;
  session: any;
  comments: string[];
  timePost: string;
};

const BlogBlock: React.FC<BlogBlockType> = ({
  title,
  mainText,
  date,
  likes,
  id,
  onDelete,
  session,
  comments,
  timePost,
}) => {
  return (
    <div className={style.blog_div}>
      <BlogTittle
        id={id}
        title={title}
        onDelete={onDelete}
        session={session}
        editImg={editImg}
        deleteImg={deleteImg}
      />
      <BlogMainText mainText={mainText} id={id} />
      <BlogInfoPanel
        likeImg={likeImg}
        likes={likes}
        comments={comments}
        timePost={timePost}
        date={date}
      />
      <BlogUnderline />
    </div>
  );
};

export default BlogBlock;
