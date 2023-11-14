import styles from "./styles/styles.module.scss";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import React from "react";
import { sessionType } from "@/utils/type";

type HeaderAccountProps = {
  session: sessionType;
  defaultAvatar: string | StaticImageData;
  onLogOut: () => void;
};

const HeaderAccount: React.FC<HeaderAccountProps> = ({ session, defaultAvatar, onLogOut }) => {
  return (
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
            {
              // @ts-ignore
              session.user?.name?.split("").length > 10
                ? session.user?.name?.split("").slice(0, 10).join("") + "..."
                : session.user?.name
            }
          </p>
          <button onClick={onLogOut}>Log out</button>
        </div>
      ) : (
        <>
          <Link href="/api/auth/signin">
            <button className={styles.log_block_signIn}>Sign in</button>
          </Link>
          <Link href="/log_in">
            <button className={styles.log_block_signUp}>Sign up</button>
          </Link>
        </>
      )}
    </div>
  );
};

export default HeaderAccount;
