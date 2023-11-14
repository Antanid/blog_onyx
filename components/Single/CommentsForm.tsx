import { ChangeEvent } from "react";
import style from "../../pages/single/style/style.module.scss";

type CommentsFormProps = {
    text: string,
    onChangeText: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    clearForm: () => void,
    newCommentPost: (e: React.FormEvent<HTMLButtonElement>) => void,
};

const CommentsForm: React.FC<CommentsFormProps> = ({text, onChangeText, clearForm, newCommentPost}) => {
  return (
    <form className={style.single_div_comments_textareaBlock}>
      <textarea value={text} onChange={onChangeText} cols={30} rows={10} />
      <div className={style.single_div_comments_textareaBlock_button}>
        <button
          onClick={clearForm}
          className={style.single_div_comments_textareaBlock_clear}
        >
          Clear area
        </button>
        <button onClick={newCommentPost} className={style.single_div_comments_textareaBlock_post}>
          Post
        </button>
      </div>
    </form>
  );
};

export default CommentsForm;
