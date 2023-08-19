"use client";

import { Button, Heading } from "@chakra-ui/react";
import Image from "next/image";
import { FC } from "react";
import { Wizard, useWizard } from "react-use-wizard";
import logo from "./logo.png";
import styles from "./page.module.scss";

const WizardControls: FC = function () {
  const {
    isLoading,
    isLastStep,
    isFirstStep,
    activeStep,
    stepCount,
    previousStep,
    nextStep,
    goToStep,
    handleStep,
  } = useWizard();

  return (
    <div className={styles["wizard-controls"]}>
      {!isFirstStep && <Button onClick={previousStep}>Back</Button>}
      {!isLastStep && (
        <Button className={styles["next-btn"]} onClick={nextStep}>
          Next
        </Button>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" height={50} />
        <Heading>Foundation UI</Heading>
      </header>
      <div className={styles["left-panel"]}>Left Sidebar</div>
      <main>
        <Wizard footer={<WizardControls />}>
          <Heading>Step 1</Heading>

          <Heading>Step 2</Heading>

          <Heading>Step 3</Heading>
        </Wizard>
      </main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
