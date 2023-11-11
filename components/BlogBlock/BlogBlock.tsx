import style from "./style/style.module.scss";
import Image from "next/image";
import Link from "next/link";

import likeImg from "../../public/likeImg.png";
import editImg from "../../public/editImg.png";
import deleteImg from "../../public/deleteImg.png";

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
  timePost
}) => {
  return (
    <Link href={`/single/${id}`}>
    <div className={style.blog_div}>
      
      <div className={style.blog_titleDiv}>
        <h2>{title}</h2>
        {session?.user?.role === "admin" && (
          <div className={style.blog_titleDiv_editDelete}>
            <Link href={`edit/${id}`}>
              <Image
                className={style.blog_editImg}
                src={editImg}
                alt="editText"
                width={20}
                height={20}
              />
            </Link>
            <button onClick={() => onDelete(id)}>
              <Image src={deleteImg} alt="editText" width={20} height={20} />
            </button>
          </div>
        )}
      </div>
      <div className={style.blog_div_text}>
        {mainText.length > 230 ? (
          <p>
            {mainText.split("").slice(0, 229).join("")}
              <span>...read more</span>
          </p>
        ) : (
          <p>{mainText}</p>
        )}
      </div>
      <div className={style.blog_div_data_like}>
        <div className={style.blog_div_button}>
          <button>
            <Image src={likeImg} alt="likeImg" width={30} height={30} layout="fixed" />
          </button>
          <p>{likes}</p>
        </div>
        <div className={style.blog_div_data}>
        <p>comments {comments.length}</p>
          <p>{date}</p>
          <p>{timePost}</p>
        </div>
      </div>
      <div className={style.blog_div_bottomLine}>
        <div className={style.blog_div_bottomLine_line}></div>
      </div>
    </div>
    </Link>
  );
};

export default BlogBlock;
