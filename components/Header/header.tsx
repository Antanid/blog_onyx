import styles from "./styles/styles.module.scss";
import Link from "next/link";
import Image from "next/image";

import ImgBlogLogo from "../../public/ImgBlogLogo.png";


const Header = () => {
  return (
    <header className={styles.header}>
      <Link href='/'>
      <Image src={ImgBlogLogo} width={70} height={70} alt="logoImg" layout="fixed" />
      </Link>
      <Link href='/'>
      <div className={styles.header_logoText}>
        <h1>Blog Master</h1>
      </div>
      </Link>
    </header>
  );
};

export default Header;
