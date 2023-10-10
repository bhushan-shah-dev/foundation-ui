import { RulesData } from "@/types";
import { Heading, Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./upload-rules-file.module.scss";

type UploadRulesFileControlProps = {
  updateIsRulesFileSelected: (isRulesFileSelected: boolean) => void;
  updateIsRulesFileUploading: (isRulesFileUploading: boolean) => void;
  onRulesEncodingCompute: (rulesData: RulesData) => void;
};

const UploadRulesFileControl: FC<UploadRulesFileControlProps> = function ({
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

  return (
    <div className={styles.container}>
      <Heading size="md">Upload quality measure</Heading>
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
      <Text size={"xs"}>
        <em>
          Supported file types: <strong>HTML</strong>, <strong>PDF</strong>
        </em>
      </Text>
    </div>
  );
};

export default UploadRulesFileControl;
