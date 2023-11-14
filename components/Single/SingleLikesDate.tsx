import style from "../../pages/single/style/style.module.scss";
import Image, { StaticImageData } from "next/image";

type SingleLikesDateProps = {
    likeImg: string | StaticImageData,
    likes: number,
    date: string
}

const SingleLikesDate: React.FC <SingleLikesDateProps> = ({likeImg, likes, date}) => {
  return (
    <div className={style.single_div_data_like}>
    <div className={style.single_div_button}>
      <button>
        <Image src={likeImg} alt="likeImg" width={30} height={30} layout="fixed" />
      </button>
      <p>{likes}</p>
    </div>
    <div className={style.single_div_data}>
      <p>{date}</p>
    </div>
  </div>
  )
}

export default SingleLikesDate