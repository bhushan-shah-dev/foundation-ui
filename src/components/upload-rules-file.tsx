import { RulesData } from "@/types";
import { Input } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./upload-rules-file.module.scss";
import { WizardStep } from "./wizard-step-wrapper";

type UploadRulesFileControlProps = {
  updateCurrentStep: (currentStep: WizardStep) => void;
  updateIsRulesFileSelected: (isRulesFileSelected: boolean) => void;
  updateIsRulesFileUploading: (isRulesFileUploading: boolean) => void;
  onRulesEncodingCompute: (rulesData: RulesData) => void;
};

const UploadRulesFileControl: FC<UploadRulesFileControlProps> = function ({
  updateCurrentStep,
  updateIsRulesFileSelected,
  updateIsRulesFileUploading,
  onRulesEncodingCompute,
}) {
  const [rulesFile, setRulesFile] = useState<File | null>(null);

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

  handleStep(async function () {
    if (!rulesFile) throw new Error("Missing rules file");

    const formData = new FormData();
    formData.append("rulesFile", rulesFile);

    updateIsRulesFileUploading(true);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/encode-rules-data`,
      {
        method: "POST",
        body: formData,
      }
    );
    updateIsRulesFileUploading(false);
    const rulesData: RulesData = await result.json();

    localStorage.setItem(
      "rulesEncoding",
      JSON.stringify(rulesData.rulesEncoding)
    );
    localStorage.setItem("variableMap", JSON.stringify(rulesData.variableMap));

    onRulesEncodingCompute(rulesData);
  });

  useEffect(
    function () {
      updateCurrentStep(WizardStep.UploadRules_1);
    },
    [updateCurrentStep]
  );

  return (
    <div className={styles.container}>
      <Input
        type="file"
        multiple
        accept=".html,text/html"
        onChange={function (e) {
          if (e.target.files?.[0]) {
            setRulesFile(e.target.files[0]);
            updateIsRulesFileSelected(true);
          }
        }}
      />
    </div>
  );
};

export default UploadRulesFileControl;
