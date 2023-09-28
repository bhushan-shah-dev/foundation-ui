import { ColumnSchemaMapping, SchemaMappingData } from "@/types";
import { Select } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useWizard } from "react-use-wizard";
import styles from "./display-column-schema-mapping.module.scss";

const NA_OPTION = "N/A";

type DisplayColumnSchemaMappingProps = {
  schemaMappingData: SchemaMappingData;
};

const DisplayColumnSchemaMapping: FC<DisplayColumnSchemaMappingProps> =
  function ({
    schemaMappingData: { patientRecordsSchema, columnSchemaMapping },
  }) {
    const [selectedColumnSchemaMapping, setSelectedColumnSchemaMapping] =
      useState<ColumnSchemaMapping>(columnSchemaMapping);

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
      localStorage.setItem(
        "patientRecordsSchema",
        JSON.stringify(patientRecordsSchema)
      );
      localStorage.setItem(
        "columnSchemaMapping",
        JSON.stringify(columnSchemaMapping)
      );
    });

    const fileOptions = new Set<string>();
    Object.values(columnSchemaMapping).forEach(function (mappingValue) {
      Object.keys(mappingValue).forEach(function (mappingValueKey) {
        fileOptions.add(mappingValueKey);
      });
    });

    return (
      <>
        {Object.entries(columnSchemaMapping).map(function ([key, value]) {
          return (
            <div key={key} className={styles.container}>
              <label>{key}</label>
              <Select
                variant="outline"
                width={200}
                onChange={function (e) {
                  const selectedFile = e.target.value;
                  const updatedColumnSchemaMapping = {
                    ...selectedColumnSchemaMapping,
                    [key]: { [selectedFile]: NA_OPTION },
                  };
                  setSelectedColumnSchemaMapping(updatedColumnSchemaMapping);
                }}
              >
                {Array.from(fileOptions).map(function (option) {
                  return (
                    <option
                      key={option}
                      value={option}
                      selected={Object.keys(value)[0] === option}
                    >
                      {option}
                    </option>
                  );
                })}
              </Select>
              <Select
                variant="outline"
                width={200}
                onChange={function (e) {
                  const selectedColumn = e.target.value;
                  const updatedColumnSchemaMapping = {
                    ...selectedColumnSchemaMapping,
                    [key]: {
                      [Object.keys(selectedColumnSchemaMapping[key])[0]]:
                        selectedColumn,
                    },
                  };
                  setSelectedColumnSchemaMapping(updatedColumnSchemaMapping);
                }}
              >
                {Object.keys(
                  patientRecordsSchema.root[
                    Object.keys(selectedColumnSchemaMapping[key])[0]
                  ] ?? {}
                )
                  .concat([NA_OPTION])
                  .map(function (option) {
                    return (
                      <option
                        key={option}
                        value={option}
                        selected={
                          Object.values(selectedColumnSchemaMapping[key])[0] ===
                          option
                        }
                      >
                        {option}
                      </option>
                    );
                  })}
              </Select>
            </div>
          );
        })}
      </>
    );
  };

export default DisplayColumnSchemaMapping;
