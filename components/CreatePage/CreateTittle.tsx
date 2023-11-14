import { ChangeEvent } from "react";
import style from "../../pages/create/style/style.module.scss";

type CreateTittleProps = {
  title: string;
  onChangeTittle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
};

const CreateTittle: React.FC<CreateTittleProps> = ({ title, onChangeTittle }) => {
  return (
    <div className={style.create_title}>
      <h2>Yout title</h2>
      <textarea value={title} onChange={onChangeTittle} />
    </div>
  );
};

export default CreateTittle;
