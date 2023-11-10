import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import style from "./style/style.module.scss";

const EmailLogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are necessary.");
      return;
    }

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }

   
      router.push("/");

    } catch (error) {
      console.log(error);
    }


  }
  return (
    <div className={style.logIn_main}>
      <div className={style.emailLogIn}>
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <input placeholder="Email" type="email" onChange={emailChange} />
          <input type="password" placeholder="Password" onChange={passwordChange} />
          <button>Log In</button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
        </form>
        <Link href="/signin">
          <p>
            {" "}
            New to Blog Master? <span className="underline">Create an account</span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmailLogIn;
