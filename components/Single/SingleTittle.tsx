import style from '../../pages/single/style/style.module.scss';

type SingleTittleProps = {
   title: string
}

const SingleTittle: React.FC <SingleTittleProps> = ({title}) => {
  return (
    <div className={style.singlePage_info_title}>
    <h1>{title}</h1>
  </div>
  )
}

export default SingleTittle