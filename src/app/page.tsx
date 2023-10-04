"use client";

import DisplayColumnSchemaMapping from "@/components/display-column-schema-mapping";
import DisplayRulesEncoding from "@/components/display-rules-encoding";
import DisplayRulesResult from "@/components/display-rules-result";
import DisplayValueSchemaMapping from "@/components/display-value-schema-mapping";
import UploadRulesFile from "@/components/upload-rules-file";
import UploadSchemaFilesControl from "@/components/upload-schema-files";
import WizardControls from "@/components/wizard-controls";
import WizardStepWrapper, {
  WizardStep,
} from "@/components/wizard-step-wrapper";
import {
  RulesData,
  RulesResult,
  SchemaMappingData,
  ValueSchemaMapping,
} from "@/types";
import { Heading } from "@chakra-ui/react";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";
import { Wizard } from "react-use-wizard";
import logo from "./logo.png";
import styles from "./page.module.scss";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<WizardStep | null>(null);
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

  const isNextStepDisabled = useMemo<boolean>(
    function () {
      if (currentStep === null) return true;
      console.table({ currentStep });
      if (
        [WizardStep.UploadRules_1, WizardStep.UploadRules_2].includes(
          currentStep
        )
      ) {
        console.log("upload rules step");
        return !isRulesFileSelected || isRulesFileUploading;
      }
      if ([WizardStep.SchemaMapping_1].includes(currentStep)) {
        console.log("schema mapping step");
        return !isSchemaFilesSelected || isSchemaFilesUploading;
      }
      return true;
    },
    [
      currentStep,
      isRulesFileSelected,
      isRulesFileUploading,
      isSchemaFilesSelected,
      isSchemaFilesUploading,
    ]
  );

  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" height={50} />
        <Heading>Foundation UI</Heading>
      </header>
      <div className={styles["left-panel"]}></div>
      <main>
        <Wizard
          footer={<WizardControls isNextStepDisabled={isNextStepDisabled} />}
        >
          <WizardStepWrapper index={0}>
            <UploadRulesFile
              updateCurrentStep={setCurrentStep}
              updateIsRulesFileSelected={setIsRulesFileSelected}
              updateIsRulesFileUploading={setIsRulesFileUploading}
              onRulesEncodingCompute={updateRulesData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper index={0} isLargeContent={true}>
            <DisplayRulesEncoding rulesData={rulesData!} />
          </WizardStepWrapper>

          <WizardStepWrapper index={1}>
            <UploadSchemaFilesControl
              updateIsSchemaFilesSelected={setIsSchemaFilesSelected}
              updateIsSchemaFilesUploading={setIsSchemaFilesUploading}
              onSchemaMappingDataCompute={updateSchemaMappingData}
            />
          </WizardStepWrapper>

          <WizardStepWrapper index={2}>
            <DisplayColumnSchemaMapping
              schemaMappingData={schemaMappingData!}
              updateValueSchemaMapping={setValueSchemaMapping}
            />
          </WizardStepWrapper>

          <WizardStepWrapper index={3}>
            <DisplayValueSchemaMapping
              valueSchemaMapping={valueSchemaMapping!}
              updateRulesResult={setRulesResult}
            />
          </WizardStepWrapper>

          <WizardStepWrapper index={4}>
            <DisplayRulesResult rulesResult={rulesResult!} />
          </WizardStepWrapper>
        </Wizard>
      </main>
      <div className={styles["right-panel"]}></div>
      <footer></footer>
    </div>
  );
}
