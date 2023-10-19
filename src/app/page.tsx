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
import { ChatIcon } from "@chakra-ui/icons";
import { Heading } from "@chakra-ui/react";
import { MendableFloatingButton } from "@mendable/search";
import { Person } from "@mui/icons-material";
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
        <Image src={logo} alt="Foundation AI logo" height={50} />
        <Heading>Foundation AI</Heading>
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
      <MendableFloatingButton
        anon_key={process.env.NEXT_PUBLIC_MENDABLE_ANON_KEY!}
        dialogPlaceholder="How to use this wizard?"
        icon={
          <ChatIcon boxSize={"1.5em"} color="var(--chakra-colors-blue-50)" />
        }
        botIcon={<Person htmlColor="var(--chakra-colors-blue-700)" />}
        popupText="Co-pilot Assistant"
        messageSettings={{
          openSourcesInNewTab: true,
          prettySources: true,
        }}
        style={{
          darkMode: false,
          accentColor: "var(--chakra-colors-blue-500)",
          backgroundColor: "var(--chakra-colors-blue-50)",
        }}
        floatingButtonStyle={{
          color: "var(--chakra-colors-blue-50)",
          backgroundColor: "var(--chakra-colors-blue-500)",
        }}
        onMessageForTracking={function (question, answer) {
          console.log("Mendable :: Message sent");
          console.table({ question, answer });
        }}
        onSourceClickedForTracking={function (source) {
          console.log("Mendable :: Source clicked");
          console.table({ source });
        }}
        onSwitchingSearchType={function (searchType) {
          console.log("Mendable :: Search type switched");
          console.table({ searchType });
        }}
        onRateClicked={function (isLiked, question, answer, sources) {
          console.log("Mendable :: Rate clicked");
          console.table({ isLiked, question, answer, sources });
        }}
      />
      <footer></footer>
    </div>
  );
}
