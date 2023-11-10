import styles from "./styles/styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import ImgBlogLogo from "../../public/ImgBlogLogo.png";
import defaultAvatar from '../../public/defaultAvatar.png';


const Header = () => {
  const { data: session } = useSession();
  function onLogOut() {
    signOut();
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_logoBLock}>
        <Link href="/">
          <Image src={ImgBlogLogo} width={70} height={70} alt="logoImg" layout="fixed" />
        </Link>
        <Link href="/">
          <div className={styles.header_logoText}>
            <h1>Blog Master</h1>
          </div>
        </Link>
      </div>
      <div className={styles.log_block}>
        {session ? (
          <div className={styles.already_log}>
            <Image
              src={session.user?.image || defaultAvatar}
              width={50}
              height={50}
              alt="logoImg"
              layout="intrinsic"
            />
            <p>
              {  // @ts-ignore
              session.user?.name?.split("").length > 10
                ? session.user?.name?.split("").slice(0, 10).join("") + "..."
                : session.user?.name}
            </p>
            <button onClick={onLogOut}>Log out</button>
          </div>
        ) : (
          <>
            <Link href="api/auth/signin">
              <button className={styles.log_block_signIn}>Sign in</button>
            </Link>
            <Link href="/log_in">
              <button className={styles.log_block_signUp}>Sign up</button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
