import { RulesData } from "@/types";
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
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import python from "react-syntax-highlighter/dist/esm/languages/hljs/python";
import docco from "react-syntax-highlighter/dist/esm/styles/hljs/docco";
import styles from "./display-rules-encoding.module.scss";

type DisplayRulesEncodingProps = {
  rulesData: RulesData;
};

SyntaxHighlighter.registerLanguage("python", python);

const DisplayRulesEncoding: FC<DisplayRulesEncodingProps> = function ({
  rulesData,
}) {
  return (
    <div className={styles.container}>
      {rulesData.rulesEncoding.map(function (ruleEncoding) {
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
                <TabPanel>
                  {/**FIXME: newlines not rendering */}
                  {ruleEncoding.plaintext}
                </TabPanel>
                <TabPanel>
                  <SyntaxHighlighter language="python" style={docco}>
                    {ruleEncoding.code}
                  </SyntaxHighlighter>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </>
        );
      })}
    </div>
  );
};

export default DisplayRulesEncoding;
