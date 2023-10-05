import { RulesResult, ValueSchemaMapping } from "@/types";
import { Select } from "chakra-react-select";
import { FC } from "react";

import { useWizard } from "react-use-wizard";
import styles from "./display-value-schema-mapping.module.scss";

type DisplayValueSchemaMappingProps = {
  valueSchemaMapping: ValueSchemaMapping;
  updateRulesResult: (rulesResult: RulesResult) => void;
};

const DisplayValueSchemaMapping: FC<DisplayValueSchemaMappingProps> =
  function ({ valueSchemaMapping, updateRulesResult }) {
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
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/calculate-result`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(valueSchemaMapping),
        }
      );

      const rulesResult: RulesResult = await result.json();
      updateRulesResult(rulesResult);
    });

    return (
      <div className={styles.container}>
        {Object.entries(valueSchemaMapping).map(function ([
          encounter,
          encounterDetails,
        ]) {
          const allOptions = encounterDetails[Object.keys(encounterDetails)[0]][
            Object.keys(encounterDetails[Object.keys(encounterDetails)[0]])[0]
          ].map(function (optionValue) {
            return {
              value: optionValue,
              label: optionValue,
            };
          });

          const selectedOptions = structuredClone(allOptions).slice(
            0,
            allOptions.length / 2
          );

          return (
            <div key={encounter} className={styles["form-field"]}>
              <label>{encounter}</label>
              <Select
                defaultValue={selectedOptions}
                isMulti
                options={allOptions}
              />
            </div>
          );
        })}
      </div>
    );
  };

export default DisplayValueSchemaMapping;
