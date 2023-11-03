import style from "./styles/styles.module.scss";

import footerGitImg from "../../public/footerGitImg.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <h3>© 2023 Blog Master. All rights reserved.</h3>
      <div className={style.footer_gitImg}>
        <button>
          {" "}
          <Image src={footerGitImg} width={40} height={40} alt="footerGitImg" layout="fixed " />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
