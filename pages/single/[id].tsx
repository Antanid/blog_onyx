import style from "./style/style.module.scss";
import { useGetSingleDataQuery } from "@/redux/singleApi";
import { useRouter } from "next/router";
import React from "react";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";

import likeImg from "../../public/likeImg.png";


const SinglePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data = [], isLoading } = useGetSingleDataQuery(id);

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
        </div>
      )}
    </div>
  );
};

export default SinglePage;
