import style from "./style/style.module.scss";

import likeImg from "../../public/likeImg.png";
import Image from "next/image";

const BlogBlock = () => {
  return (
    <div className={style.blog_div}>
      <h2>block TEXT</h2>
      <div className={style.blog_div_text}>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia inventore rerum, itaque
          tempora reiciendis molestias nemo sunt minus praesentium in impedit magni fuga dolor
          pariatur adipisci. Eius repellat assumenda inventore.
        </p>
      </div>
      <div className={style.blog_div_buttonLike}>
        <button>
          <Image src={likeImg} alt="likeImg" width={30} height={30} layout="fixed" />
        </button>
        <p>0</p>
      </div>
      <div className={style.blog_div_bottomLine}>
        <div className={style.blog_div_bottomLine_line}></div>
      </div>
    </div>
  );
};

export default BlogBlock;
