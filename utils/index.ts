import { blogApi } from "@/redux/blogApi";
import { singleApi } from "@/redux/singleApi";
import { store } from "@/redux/store";

export function newDate() {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
    const year = date.getFullYear();

    const formattedDate = `${day}.${month}.${year}`;
    return formattedDate;
  }

  export async function clearCache(){
    await store.dispatch(blogApi.util.resetApiState());
    await store.dispatch(singleApi.util.resetApiState());
  }

  export function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }
