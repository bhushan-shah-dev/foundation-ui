"use client";

import DisplayRulesEncoding from "@/components/display-rules-encoding";
import UploadRulesFile from "@/components/upload-rules-file";
import WizardControls from "@/components/wizard-controls";
import WizardStepWrapper from "@/components/wizard-step-wrapper";
import { RulesEncoding } from "@/types";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Wizard } from "react-use-wizard";
import logo from "./logo.png";
import styles from "./page.module.scss";

export default function Home() {
  const [isRulesFileUploaded, setIsRulesFileUploaded] =
    useState<boolean>(false);
  const [rulesEncoding, setRulesEncoding] = useState<RulesEncoding | null>(
    null
  );

  const updateRulesEncoding = useCallback(function (
    rulesEncoding: RulesEncoding
  ) {
    setRulesEncoding(rulesEncoding);
  },
  []);

  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" height={50} />
        <Heading>Foundation UI</Heading>
      </header>
      <div className={styles["left-panel"]}>Left Sidebar</div>
      <main>
        <Wizard
          footer={<WizardControls isNextStepDisabled={!isRulesFileUploaded} />}
        >
          <WizardStepWrapper>
            <UploadRulesFile
              onRulesFileUpload={function () {
                setIsRulesFileUploaded(true);
              }}
              onRulesEncodingCompute={updateRulesEncoding}
            />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <DisplayRulesEncoding rulesEncoding={rulesEncoding!} />
          </WizardStepWrapper>

          <Heading>Step 3</Heading>
        </Wizard>
      </main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
