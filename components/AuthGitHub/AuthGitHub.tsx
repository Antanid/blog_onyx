import style from "./style/style.module.scss";
import { signIn } from "next-auth/react";
import Image from "next/image";

import gitHubImg from "../../public/gitHubImg.png";
import { useRouter } from "next/navigation";

const AuthGitHub = () => {

 function handleClick() {
   signIn("github");
  }
  return (
    <div className={style.github_div}>
      <button onClick={handleClick}>
        <Image
          className={style.auth_gitHubImg}
          src={gitHubImg}
          alt="editText"
          width={20}
          height={20}
        />
        Continue with GitHub
      </button>
    </div>
  );
};

export default AuthGitHub;
