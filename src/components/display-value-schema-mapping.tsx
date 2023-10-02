import { ValueSchemaMapping } from "@/types";
import { Select } from "chakra-react-select";
import { FC } from "react";

import styles from "./display-value-schema-mapping.module.scss";

type DisplayValueSchemaMappingProps = {
  valueSchemaMapping: ValueSchemaMapping;
};

const DisplayValueSchemaMapping: FC<DisplayValueSchemaMappingProps> =
  function ({ valueSchemaMapping }) {
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
            <label key={encounter}>
              {encounter}
              <Select
                defaultValue={selectedOptions}
                isMulti
                options={allOptions}
              />
            </label>
          );
        })}
      </div>
    );
  };

export default DisplayValueSchemaMapping;
