import styles from "./styles/styles.module.scss";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

import ImgBlogLogo from "../../public/ImgBlogLogo.png";
import defaultAvatar from "../../public/defaultAvatar.png";
import HeaderLogoText from "./HeaderLogoText";
import HeaderAccount from "./HeaderAccount";

const Header = () => {
  const { data: session } = useSession();
  function onLogOut() {
    signOut();
  }

  return (
    <header className={styles.header}>
      <HeaderLogoText ImgBlogLogo={ImgBlogLogo} />
      <HeaderAccount session={session} onLogOut={onLogOut} defaultAvatar={defaultAvatar} />
    </header>
  );
};

export default Header;
