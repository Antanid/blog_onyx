import { ChangeEvent } from "react";
import style from "../../pages/create/style/style.module.scss";

type CreateTextAreaProps = {
    textArea: string,
    onChangeTextArea: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const CreateTextArea: React.FC <CreateTextAreaProps> = ({textArea,onChangeTextArea }) => {
  return (
    <div className={style.create_mainText}>
    <h2>Edit your main text</h2>
    <textarea value={textArea} onChange={onChangeTextArea} />
  </div>
  )
}

export default CreateTextArea