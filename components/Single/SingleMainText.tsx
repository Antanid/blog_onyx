import style from "../../pages/single/style/style.module.scss";

type SingleMainTextProps = {
    mainText: string
};

const SingleMainText: React.FC<SingleMainTextProps> = ({mainText}) => {
  return (
    <div className={style.singlePage_info_main}>
      <p>{mainText}</p>
    </div>
  );
};

export default SingleMainText;
