import style from "./style/style.module.scss";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import validationSchema from "@/yup/signinValid";



const EmailSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function nameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }
  function emailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function passwordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const role =
      name === "admin" && password === "admin" && email === "admin@gmail.com" ? "admin" : "user";
    if (!name || !email || !password) {
      setError("All fields are necessary.");
      return;
    }
    try {

      await validationSchema.validate({ name, email, password }, { abortEarly: false });

      const resUser = await fetch("api/userExists/route", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const data = await resUser.text();

        if(data === 'true'){
          setError('This user already exists.')
          return;
       }

       const res = await fetch("api/register/route", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           name,
           email,
           password,
           role,
         }),
       });
       const form = document.getElementById("form_id")! as HTMLFormElement;
       await signIn("credentials", {
         email,
         password,
         redirect: false,
       });
       form.reset();
       router.push("/");
    } catch (error) {
      const errorMessage = (error as any).inner.map((err: any) => err.message).join('\n');
      setError(errorMessage);
    }
  };

  return (
    <div className={style.emailSignIn}>
      <h1>Register</h1>
      <form onSubmit={onHandleSubmit} id="form_id">
        <input onChange={nameChange} type="text" placeholder="Full name" />
        <input placeholder="Email" type="email" onChange={emailChange} />
        <input type="password" placeholder="Password" onChange={passwordChange} />
        <button>Register</button>
        {error && (
          <div className={style.error_div}>
           <p>{error}</p>
          </div>
        )}
      </form>

      <Link href="/log_in">
        <p>
          {" "}
          Already have an account? <span className="underline">Login</span>
        </p>
      </Link>
    </div>
  );
};

export default EmailSignIn;
