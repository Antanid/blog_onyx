import style from "./style/style.module.scss";
import { blogApi } from "@/redux/blogApi";
import { useRouter } from "next/router";

import React, { useEffect, useState } from "react";
import Loader from "@/components/Loader/Loader";
import { store } from "@/redux/store";
import { singleApi, useEditDataMutation, useGetSingleDataQuery } from "@/redux/singleApi";
import { useSession } from "next-auth/react";
import { clearCache } from "@/utils";

const EditPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;
  // @ts-ignore
  const { data = [], isLoading } = useGetSingleDataQuery(id);
  const [textArea, setTextArea] = useState("");
  const [title, setTitle] = useState("");
  const [mutate] = useEditDataMutation();

  useEffect(() => {
    setTextArea(data.mainText);
    setTitle(data.title);
  }, [isLoading]);

  useEffect(() => {
     // @ts-ignore
if(session?.user?.role !== 'admin'){
  router.push("/");
}
  }, [])

  const onSaveEdit = async () => {
    const newData = {
      title: title,
      mainText: textArea,
      date: data.date,
      likes: data.likes,
      timePost: data.timePost,
      id: data.id,
      comments: data.comments
    };
    await mutate({ newData, id });
    clearCache()
    router.push("/");
  };

  function goBack() {
    const confirmed = window.confirm("Are you shure?");
    if (confirmed) {
      router.push("/");
    }
  }

  return (
    <div className={style.edits}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={style.edtis_title}>
            <h2>Yout title</h2>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className={style.edits_mainText}>
            <h2>Edit your main text</h2>
            <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} />
          </div>
          <div className={style.edits_buttons}>
            <button onClick={goBack} className={style.edits_buttons_cancel}>Cancel</button>
            <button onClick={onSaveEdit} className={style.edits_buttons_save}>
              Save edit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditPage;
