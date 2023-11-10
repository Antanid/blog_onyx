import style from "./style/style.module.scss";

import AuthGitHub from "@/components/AuthGitHub/AuthGitHub";
import AuthGoogle from "@/components/AuthGoogle/AuthGoogle";
import EmailSignIn from "@/components/EmailSignIn/EmailSignIn";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";



const SignInComponent = () => {
  const { data: session } = useSession();
  const route = useRouter();
 if(session?.user){
  route.push('/')
 }
  return (
    <div className={style.signin_div}>
      <AuthGoogle />
      <AuthGitHub />
      <h3>Or</h3>
      <EmailSignIn />
    </div>
  );
};

export default SignInComponent;
