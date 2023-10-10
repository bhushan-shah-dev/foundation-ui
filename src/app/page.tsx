"use client";

import DisplayColumnSchemaMapping from "@/components/display-column-schema-mapping";
import DisplayRulesEncoding from "@/components/display-rules-encoding";
import DisplayRulesResult from "@/components/display-rules-result";
import DisplayValueSchemaMapping from "@/components/display-value-schema-mapping";
import UploadRulesFile from "@/components/upload-rules-file";
import UploadSchemaFilesControl from "@/components/upload-schema-files";
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
  const [isRulesFileSelected, setIsRulesFileSelected] =
    useState<boolean>(false);
  const [isRulesFileUploading, setIsRulesFileUploading] =
    useState<boolean>(false);
  const [isSchemaFilesSelected, setIsSchemaFilesSelected] =
    useState<boolean>(false);
  const [isSchemaFilesUploading, setIsSchemaFilesUploading] =
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
      <div className={styles["left-panel"]}></div>

      <main>
        <Wizard>
          <WizardStepWrapper
            index={0}
            isPrevStepDisabled={true}
            isNextStepDisabled={!isRulesFileSelected || isRulesFileUploading}
          >
            <UploadRulesFile
              updateIsRulesFileSelected={setIsRulesFileSelected}
              updateIsRulesFileUploading={setIsRulesFileUploading}
              onRulesEncodingCompute={updateRulesData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper
            index={0}
            isLargeContent={true}
            isPrevStepDisabled={false}
            isNextStepDisabled={false}
          >
            <DisplayRulesEncoding rulesData={rulesData!} />
          </WizardStepWrapper>

          <WizardStepWrapper
            index={1}
            isPrevStepDisabled={false}
            isNextStepDisabled={
              !isSchemaFilesSelected || isSchemaFilesUploading
            }
          >
            <UploadSchemaFilesControl
              updateIsSchemaFilesSelected={setIsSchemaFilesSelected}
              updateIsSchemaFilesUploading={setIsSchemaFilesUploading}
              onSchemaMappingDataCompute={updateSchemaMappingData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper
            index={1}
            isPrevStepDisabled={false}
            isNextStepDisabled={false}
          >
            <DisplayColumnSchemaMapping
              schemaMappingData={schemaMappingData!}
              updateValueSchemaMapping={setValueSchemaMapping}
            />
          </WizardStepWrapper>

          <WizardStepWrapper
            index={1}
            isPrevStepDisabled={false}
            isNextStepDisabled={false}
          >
            <DisplayValueSchemaMapping
              valueSchemaMapping={valueSchemaMapping!}
              updateRulesResult={setRulesResult}
            />
          </WizardStepWrapper>

          <WizardStepWrapper index={2} isPrevStepDisabled={false}>
            <DisplayRulesResult rulesResult={rulesResult!} />
          </WizardStepWrapper>
        </Wizard>
      </main>

      <div className={styles["right-panel"]}></div>
      <footer></footer>
    </div>
  );
}
