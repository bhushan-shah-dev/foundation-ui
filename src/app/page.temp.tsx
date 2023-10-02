"use client";

import DisplayValueSchemaMapping from "@/components/display-value-schema-mapping";
import WizardControls from "@/components/wizard-controls";
import WizardStepWrapper from "@/components/wizard-step-wrapper";
import { RulesData, SchemaMappingData, ValueSchemaMapping } from "@/types";
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
    useState<ValueSchemaMapping | null>({
      "Encounter, Performed": {
        "encounters.csv": {
          DESCRIPTION: [
            "Acute Inpatient",
            "Annual Wellness Visit",
            "Emergency Department Visit",
            "Encounter Inpatient",
            "Frailty Encounter",
            "Home Healthcare Services",
            "Hospice Encounter",
            "Nonacute Inpatient",
            "Observation",
            "Office Visit",
            "Online Assessments",
            "Outpatient",
            "Palliative Care Encounter",
            "Preventive Care Services Established Office Visit",
            "18 and Up",
            "Preventive Care Services Initial Office Visit",
            "18 and Up",
            "Telephone Visits",
          ],
        },
      },
      "Medication, Active": {
        "medications.csv": {
          DESCRIPTION: [
            "Donepezil",
            "Rivastigmine",
            "Galantamine",
            "Memantine",
            "Tacrine",
            "Rivastigmine patch",
            "Donepezil patch",
            "Memantine patch",
            "Galantamine patch",
            "Memantine extended-release",
            "Rivastigmine extended-release",
            "Donepezil extended-release",
            "Galantamine extended-release",
            "Memantine oral solution",
            "Rivastigmine oral solution",
            "Donepezil oral solution",
            "Galantamine oral solution",
            "Memantine nasal spray",
            "Rivastigmine nasal spray",
            "Donepezil nasal spray",
          ],
        },
      },
      "Procedure, Performed": {
        "procedures.csv": {
          DESCRIPTION: [
            "Colonoscopy",
            "CT Colonography",
            "Flexible Sigmoidoscopy",
            "Total Colectomy",
          ],
        },
      },
    });

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
            <DisplayValueSchemaMapping
              valueSchemaMapping={valueSchemaMapping!}
            />
          </WizardStepWrapper>
        </Wizard>
      </main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
