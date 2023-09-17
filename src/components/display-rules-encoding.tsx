import { RulesEncoding } from "@/types";
import {
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
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
            {ruleEncoding.additionalInfo ? (
              <Text>{JSON.stringify(ruleEncoding.additionalInfo)}</Text>
            ) : null}
            <Tabs>
              <TabList>
                <Tab>Rules</Tab>
                <Tab>Code</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>{ruleEncoding.plaintext}</TabPanel>
                <TabPanel>{ruleEncoding.code}</TabPanel>
              </TabPanels>
            </Tabs>
          </>
        );
      })}
    </div>
  );
};

export default DisplayRulesEncoding;
