import { RulesData } from "@/types";
import {
  Container,
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
import codeStyle from "react-syntax-highlighter/dist/esm/styles/hljs/atelier-forest-dark";
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
      {rulesData.rulesEncoding.map(function (ruleEncoding, i) {
        return (
          <div className={styles["rule-item"]} key={i}>
            <Heading size={"md"}>{ruleEncoding.sectionName}</Heading>
            {ruleEncoding.additionalInfo ? (
              <Text>{JSON.stringify(ruleEncoding.additionalInfo)}</Text>
            ) : null}
            <Tabs variant={"enclosed"}>
              <TabList>
                <Tab>Rules</Tab>
                <Tab>Code</Tab>
              </TabList>
              <Container
                maxW={"100%"}
                className={styles["tab-panels-container"]}
              >
                <TabPanels>
                  <TabPanel
                    className={styles["tab-panel"]}
                    dangerouslySetInnerHTML={{
                      __html: ruleEncoding.plaintext.replace(/\n/g, "<br />"),
                    }}
                  />
                  <TabPanel className={styles["tab-panel"]}>
                    <SyntaxHighlighter language="python" style={codeStyle}>
                      {ruleEncoding.code}
                    </SyntaxHighlighter>
                  </TabPanel>
                </TabPanels>
              </Container>
            </Tabs>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayRulesEncoding;
