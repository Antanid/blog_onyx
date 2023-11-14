import style from "./style/style.module.scss";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { sessionType } from "@/utils/type";

type BlogTittleProps = {
    title: string,
    id: string,
    session: sessionType,
    editImg: string | StaticImageData,
    onDelete: (id: string) => void,
    deleteImg: string| StaticImageData
}

const BlogTittle: React.FC <BlogTittleProps> = ({title, id, session, editImg, onDelete, deleteImg}) => {
  return (
    <div className={style.blog_titleDiv}>
    <Link href={`/single/${id}`}>
      <h2>{title}</h2>
      </Link>
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
  )
}

export default BlogTittle