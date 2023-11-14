import style from "./style/style.module.scss";
import Image, { StaticImageData } from "next/image";


type BlogInfoPanelProps = {
    likeImg: string | StaticImageData,
    likes: number,
    comments: string[],
    date: string,
    timePost: string
}

const BlogInfoPanel: React.FC <BlogInfoPanelProps> = ({likeImg, likes, comments, date, timePost}) => {
  return (
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
  )
}

export default BlogInfoPanel