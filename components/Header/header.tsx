import styles from "./styles/styles.module.scss";

import Image from "next/image";

import ImgBlogLogo from "../../public/ImgBlogLogo.png";

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={ImgBlogLogo} width={70} height={70} alt="logoImg" layout="fixed" />

      <div className={styles.header_logoText}>
        <h1>Blog Master</h1>
      </div>
    </header>
  );
};

export default Header;
