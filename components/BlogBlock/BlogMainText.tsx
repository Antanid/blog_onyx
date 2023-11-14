import style from "./style/style.module.scss";
import Link from "next/link";

type BlogMainTextProps = {
    mainText: string,
    id: string
}

const BlogMainText: React.FC <BlogMainTextProps> = ({mainText, id}) => {
  return (
    <Link href={`/single/${id}`}>
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
    </Link>
  )
}

export default BlogMainText