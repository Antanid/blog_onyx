import styles from "./styles/styles.module.scss";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

type HeaderLogoTextProps = {
  ImgBlogLogo: string | StaticImageData;
};

const HeaderLogoText: React.FC<HeaderLogoTextProps> = ({ ImgBlogLogo }) => {
  return (
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
  );
};

export default HeaderLogoText;
