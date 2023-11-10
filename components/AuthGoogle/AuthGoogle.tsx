import { signIn } from "next-auth/react";
import Image from "next/image";
import style from "./style/style.module.scss";

import GoogleImg from "../../public/GoogleAuth.png";
import { useRouter } from "next/navigation";

const AuthGoogle = () => {
  const handleClick = () => {
  signIn("google");
  };

  return (
    <div className={style.google_div}>
    <button
      onClick={handleClick}
    >
      <Image
        className={style.auth_googleImg}
        src={GoogleImg}
        alt="editText"
        width={20}
        height={20}
      />
      <span className="ml-4">Continue with Google</span>
    </button>
    </div>
  );
};

export default AuthGoogle;
