import style from "./style/style.module.scss";

import React, { ChangeEvent, useEffect, useState } from "react";
import { useGetDataQuery, usePostDataMutation } from "@/redux/blogApi";
import { useRouter } from "next/navigation";
import { newDate } from "@/utils";
import ErrorMessage from "@/components/CreatePage/ErrorMessage";
import CreateTittle from "@/components/CreatePage/CreateTittle";
import CreateTextArea from "@/components/CreatePage/CreateTextArea";
import CreateButton from "@/components/CreatePage/CreateButton";

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

  const onNewPost = async () => {
    const newPost = {
      title: title,
      mainText: textArea,
      likes: 0,
      timePost: newDate(),
      id: +(data.length + 1),
      date: newDate(),
      comments: [],
    };
    if (title.length > 0 && textArea.length > 0) {
      await mutate(newPost);
      router.push("/");
    } else {
      setError(true);
    }
  };

  function goBack() {
    const confirmed = window.confirm("Are you shure?");
    if (confirmed) {
      router.push("/");
    }
  }

  function onChangeTittle(e: ChangeEvent<HTMLTextAreaElement>) {
    setTitle(e.target.value);
  }
  function onChangeTextArea(e: ChangeEvent<HTMLTextAreaElement>) {
    setTextArea(e.target.value);
  }

  return (
    <div className={style.create}>
      <ErrorMessage error={error} title={title} textArea={textArea} />
      <CreateTittle title={title} onChangeTittle={onChangeTittle} />
      <CreateTextArea textArea={textArea} onChangeTextArea={onChangeTextArea} />
      <CreateButton onNewPost={onNewPost} goBack={goBack} />
    </div>
  );
};

export default Create;
