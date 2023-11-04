import BlogBlock from "@/components/BlogBlock/BlogBlock";
import Loader from "@/components/Loader/Loader";
import NewPost from "@/components/NewPost/NewPost";
import { blogApi, useDeletetItemMutation, useGetDataQuery } from "@/redux/blogApi";
import { useEffect } from "react";

interface blogDataType {
  title: string;
  mainText: string;
  date: string;
  likes: number;
  id: string;
}

export default function Home() {
  // @ts-ignore
  const { data = [], isLoading } = useGetDataQuery();
  const [deleteItem] = useDeletetItemMutation();

  const onDelete = (id: string) => {
    const confirmed = window.confirm('Are you shure?');
    if(confirmed){
      deleteItem(id).unwrap
    }
  }

  return (
    <div>
      <NewPost />
      <h1 className="homeBlockH1">Hello, this is my blog</h1>
      {isLoading ? (
        <Loader />
      ) : (
        [...data].reverse().map((i: blogDataType) => (
          <BlogBlock
          onDelete={onDelete}
            key={i.id}
            title={i.title}
            mainText={i.mainText}
            date={i.date}
            likes={i.likes}
            id={i.id}
          />
        ))
      )}
    </div>
  );
}
