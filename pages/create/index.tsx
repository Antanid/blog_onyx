import style from "./style/style.module.scss";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useGetDataQuery, usePostDataMutation } from "@/redux/blogApi";
import { useRouter } from "next/navigation";

const Create = () => {
  // @ts-ignore
  const { data = [], isLoading } = useGetDataQuery();
  const [textArea, setTextArea] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState(false);
  const [mutate] = usePostDataMutation();
  const router = useRouter();

   useEffect(() => {
     const t = setTimeout(() => {
       setError(false);
     }, 3000);
     return () => {
       clearTimeout(t);
     };
   }, [error, setError]);

  function newDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  const onNewPost = async () => {
    const newPost = {
      title: title,
      mainText: textArea,
      likes: 0,
      id: +(data.length + 1),
      date: newDate(),
    };
    if (title.length > 0 && textArea.length > 0) {
      await mutate(newPost);
      router.push("/");
    } else {
      setError(true);
    }
  };

  return (
    <div className={style.create}>
        <div className={error ? style.error_show : style.error_disable}>
          <p>
          {`Please write somithing in ${
           title.length === 0 && textArea.length === 0 ? "input/main text" :  title.length === 0 ? "title" : "main text"
          }. Then you can post`}
          </p>
        </div>

      <div className={style.create_title}>
        <h2>Yout title</h2>
        <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={style.create_mainText}>
        <h2>Edit your main text</h2>
        <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} />
      </div>
      <div className={style.create_buttons}>
        <Link href="/">
          <button className={style.create_buttons_cancel}>Go back</button>
        </Link>
        <button onClick={onNewPost} className={style.create_buttons_post}>
          Post
        </button>
      </div>
    </div>
  );
};

export default Create;
