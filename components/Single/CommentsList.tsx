import style from "../../pages/single/style/style.module.scss";
import Image, { StaticImageData } from "next/image";
import { commentsType } from "@/pages/single/[id]";

type CommentsListProps = {
  defautlImg: string | StaticImageData;
  data: {
    title: string,
    mainText: string,
    date: string,
    likes: number,
    timePost: string,
    id: string,
    comments: commentsType[]
  },

};

const CommentsList: React.FC<CommentsListProps> = ({ defautlImg, data }) => {
  return (
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
  );
};

export default CommentsList;
