"use client";

import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import logo from "./logo.png";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" height={50} />
        <Heading>Foundation UI</Heading>
      </header>
      <div className={styles["left-panel"]}>Left Sidebar</div>
      <main> Main Content</main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
