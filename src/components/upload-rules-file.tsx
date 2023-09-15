import { RulesEncoding } from "@/types";
import { Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./upload-rules-file.module.scss";

type UploadRulesFileControlProps = {
  onRulesFileUpload: () => void;
  onRulesEncodingCompute: (rulesEncoding: RulesEncoding) => void;
};

const UploadRulesFileControl: FC<UploadRulesFileControlProps> = function ({
  onRulesFileUpload,
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

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/upload-rules-file`,
      {
        method: "POST",
        body: formData,
      }
    );
    const rulesEncoding: RulesEncoding = await result.json();

    onRulesEncodingCompute(rulesEncoding);
  });

  return (
    <div className={styles.container}>
      <Text fontSize="3xl">Upload rules file</Text>
      <Input
        type="file"
        accept=".html,text/html"
        onChange={function (e) {
          if (e.target.files?.[0]) {
            setRulesFile(e.target.files[0]);
            onRulesFileUpload();
          }
        }}
      />
    </div>
  );
};

export default UploadRulesFileControl;
