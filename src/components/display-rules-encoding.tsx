import { RulesEncoding } from "@/types";
import { Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import styles from "./display-rules-encoding.module.scss";

type DisplayRulesEncodingProps = {
  rulesEncoding: RulesEncoding;
};

const DisplayRulesEncoding: FC<DisplayRulesEncodingProps> = function ({
  rulesEncoding,
}) {
  return (
    <div className={styles.container}>
      {Object.entries(rulesEncoding).map(function ([ruleType, ruleEncoding]) {
        return (
          <>
            <Heading>{ruleType}</Heading>
            <Text>{JSON.stringify(ruleEncoding)}</Text>
          </>
        );
      })}
    </div>
  );
};

export default DisplayRulesEncoding;
