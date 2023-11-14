import style from '../../pages/create/style/style.module.scss';

type ErrorMessageProps = {
    error: boolean,
    title: string,
    textArea: string
}


const ErrorMessage: React.FC <ErrorMessageProps> = ({error, title, textArea}) => {
  return (
    <div className={error ? style.error_show : style.error_disable}>
    <p>
      {`Please write somithing in ${
        title.length === 0 && textArea.length === 0
          ? "input/main text"
          : title.length === 0
          ? "title"
          : "main text"
      }. Then you can post`}
    </p>
  </div>
  )
}

export default ErrorMessage