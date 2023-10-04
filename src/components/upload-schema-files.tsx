import { SchemaMappingData } from "@/types";
import { Heading, Input } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./upload-schema-files.module.scss";

type UploadSchemaFilesControlProps = {
  updateIsSchemaFilesSelected: (isSchemaFilesSelected: boolean) => void;
  updateIsSchemaFilesUploading: (isSchemaFilesUploading: boolean) => void;
  onSchemaMappingDataCompute: (schemaMappingData: SchemaMappingData) => void;
};

const UploadSchemaFilesControl: FC<UploadSchemaFilesControlProps> = function ({
  updateIsSchemaFilesSelected,
  updateIsSchemaFilesUploading,
  onSchemaMappingDataCompute,
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

    updateIsSchemaFilesUploading(true);
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/column-schema-mapping`,
      {
        method: "POST",
        body: formData,
      }
    );
    updateIsSchemaFilesUploading(false);
    const schemaMappingData: SchemaMappingData = await result.json();

    onSchemaMappingDataCompute(schemaMappingData);
  });

  return (
    <div className={styles.container}>
      <Heading size="md">Upload patient data files</Heading>
      <Input
        type="file"
        multiple
        onChange={function (e) {
          if (e.target.files?.length) {
            setSchemaFiles(e.target.files);
            updateIsSchemaFilesSelected(true);
          }
        }}
      />
    </div>
  );
};

export default UploadSchemaFilesControl;
