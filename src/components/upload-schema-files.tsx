import { SchemaMappingData } from "@/types";
import { Input, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./upload-rules-file.module.scss";

type UploadSchemaFilesControlProps = {
  onSchemaFilesUpload: () => void;
  onSchemaMappingDataCompute: (schemaMappingData: SchemaMappingData) => void;
};

const UploadSchemaFilesControl: FC<UploadSchemaFilesControlProps> = function ({
  onSchemaFilesUpload,
  onSchemaMappingDataCompute: onColumnSchemaMappingCompute,
}) {
  const [schemaFiles, setSchemaFiles] = useState<FileList | null>(null);

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
    if (!schemaFiles?.length) throw new Error("Missing patient data files");

    const variableMapString = localStorage.getItem("variableMap");
    if (!variableMapString) throw new Error("Missing variable map");

    const formData = new FormData();
    for (let i = 0; i < schemaFiles.length; i++) {
      formData.append("schemaFiles", schemaFiles.item(i)!);
    }
    formData.append("variableMap", variableMapString);

    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/column-schema-mapping`,
      {
        method: "POST",
        body: formData,
      }
    );
    const schemaMappingData: SchemaMappingData = await result.json();

    onColumnSchemaMappingCompute(schemaMappingData);
  });

  return (
    <div className={styles.container}>
      <Text fontSize="3xl">Upload patient data files</Text>
      <Input
        type="file"
        multiple
        onChange={function (e) {
          if (e.target.files?.length) {
            setSchemaFiles(e.target.files);
          }
        }}
      />
    </div>
  );
};

export default UploadSchemaFilesControl;
