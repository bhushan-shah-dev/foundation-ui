import Image from "next/image";
import logo from "./logo.png";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" width={50} height={50} />
        Foundation UI
      </header>
      <div className={styles["left-panel"]}>Left Sidebar</div>
      <main> Main Content</main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
