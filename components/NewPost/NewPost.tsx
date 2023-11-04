import Link from "next/link";
import style from "./style/style.module.scss";

const NewPost = () => {
  return (
    <div className={style.new_post}>
        <Link href='/create'>
      <button className={style.new_post_button}>Create new post</button>
      </Link>
    </div>
  );
};

export default NewPost;
