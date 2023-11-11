import BlogBlock from "@/components/BlogBlock/BlogBlock";
import Loader from "@/components/Loader/Loader";
import NewPost from "@/components/NewPost/NewPost";
import { useDeletetItemMutation, useGetDataQuery } from "@/redux/blogApi";
import { useSession } from "next-auth/react";

interface blogDataType {
  title: string;
  mainText: string;
  date: string;
  likes: number;
  comments: string[];
  id: string;
  timePost: string;
}

export default function Home() {
  // @ts-ignore
  const { data = [], isLoading } = useGetDataQuery();
  const [deleteItem] = useDeletetItemMutation();
  const { data: session } = useSession();

  const onDelete = (id: string) => {
    const confirmed = window.confirm("Are you shure?");
    if (confirmed) {
      deleteItem(id).unwrap;
    }
  };

  return (
    <div>
      {
        // @ts-ignore
        session && session.user?.role === "admin" && <NewPost />
      }

      <h1 className="homeBlockH1">Hello, this is my blog</h1>
      {isLoading ? (
        <Loader />
      ) : (
        [...data]
          .reverse()
          .map((i: blogDataType) => (
            <BlogBlock
              comments={i.comments}
              session={session}
              onDelete={onDelete}
              key={i.id}
              title={i.title}
              mainText={i.mainText}
              date={i.date}
              likes={i.likes}
              id={i.id}
              timePost={i.timePost}
            />
          ))
      )}
    </div>
  );
}
