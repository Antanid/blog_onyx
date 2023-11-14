import style from "../../pages/create/style/style.module.scss";

type CreateButtonProps = {
  goBack: () => void;
  onNewPost: () => void;
};

const CreateButton: React.FC<CreateButtonProps> = ({ goBack, onNewPost }) => {
  return (
    <div className={style.create_buttons}>
      <button onClick={goBack} className={style.create_buttons_cancel}>
        Go back
      </button>
      <button onClick={onNewPost} className={style.create_buttons_post}>
        Post
      </button>
    </div>
  );
};

export default CreateButton;
