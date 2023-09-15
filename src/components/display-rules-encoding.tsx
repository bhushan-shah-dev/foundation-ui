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
      {rulesEncoding.map(function (ruleEncoding) {
        return (
          <>
            <Heading>{ruleEncoding.sectionName}</Heading>
            <Text>{JSON.stringify(ruleEncoding.plaintext)}</Text>
            <Text>{JSON.stringify(ruleEncoding.code)}</Text>
            {ruleEncoding.additionalInfo ? (
              <Text>{JSON.stringify(ruleEncoding.additionalInfo)}</Text>
            ) : null}
          </>
        );
      })}
    </div>
  );
};

export default DisplayRulesEncoding;
