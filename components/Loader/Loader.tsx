import style from './style/style.module.scss';

import { FallingLines } from 'react-loader-spinner'

const Loader = () => {
  return (
    <div className={style.loader}>
<FallingLines
  color="#4fa94d"
  width="100"
  visible={true}
/>
    </div>
  )
}

export default Loader