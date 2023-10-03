"use client";

import DisplayColumnSchemaMapping from "@/components/display-column-schema-mapping";
import DisplayRulesEncoding from "@/components/display-rules-encoding";
import DisplayRulesResult from "@/components/display-rules-result";
import DisplayValueSchemaMapping from "@/components/display-value-schema-mapping";
import UploadRulesFile from "@/components/upload-rules-file";
import UploadSchemaFilesControl from "@/components/upload-schema-files";
import WizardControls from "@/components/wizard-controls";
import WizardStepWrapper from "@/components/wizard-step-wrapper";
import {
  RulesData,
  RulesResult,
  SchemaMappingData,
  ValueSchemaMapping,
} from "@/types";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Wizard } from "react-use-wizard";
import logo from "./logo.png";
import styles from "./page.module.scss";

export default function Home() {
  const [isRulesFileUploaded, setIsRulesFileUploaded] =
    useState<boolean>(false);
  const [isSchemaFilesUploaded, setIsSchemaFilesUploaded] =
    useState<boolean>(false);
  const [rulesData, setRulesData] = useState<RulesData | null>(null);
  const [schemaMappingData, setSchemaMappingData] =
    useState<SchemaMappingData | null>(null);
  const [valueSchemaMapping, setValueSchemaMapping] =
    useState<ValueSchemaMapping | null>(null);
  const [rulesResult, setRulesResult] = useState<RulesResult | null>(null);

  const updateRulesData = useCallback(function (rulesData: RulesData) {
    setRulesData(rulesData);
  }, []);

  const updateSchemaMappingData = useCallback(function (
    schemaMappingData: SchemaMappingData
  ) {
    setSchemaMappingData(schemaMappingData);
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
        {/**FIXME: update isNextStepDisabled to decide based on current step */}
        <Wizard
          footer={<WizardControls isNextStepDisabled={!isRulesFileUploaded} />}
        >
          <WizardStepWrapper>
            <UploadRulesFile
              onRulesFileUpload={function () {
                setIsRulesFileUploaded(true);
              }}
              onRulesEncodingCompute={updateRulesData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <DisplayRulesEncoding rulesData={rulesData!} />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <UploadSchemaFilesControl
              onSchemaFilesUpload={function () {
                setIsSchemaFilesUploaded(true);
              }}
              onSchemaMappingDataCompute={updateSchemaMappingData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <DisplayColumnSchemaMapping
              schemaMappingData={schemaMappingData!}
              updateValueSchemaMapping={setValueSchemaMapping}
            />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <DisplayValueSchemaMapping
              valueSchemaMapping={valueSchemaMapping!}
              updateRulesResult={setRulesResult}
            />
          </WizardStepWrapper>

          <WizardStepWrapper>
            <DisplayRulesResult rulesResult={rulesResult!} />
          </WizardStepWrapper>
        </Wizard>
      </main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
