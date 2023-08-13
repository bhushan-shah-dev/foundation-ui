"use client";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useState } from "react";
import logo from "./logo.png";
import styles from "./page.module.scss";

enum Tabs {
  LEARN = "learn",
  APPLY = "apply",
}

const TabLabels: Record<Tabs, string> = {
  [Tabs.LEARN]: "Learn",
  [Tabs.APPLY]: "Apply",
};

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tabs>(Tabs.LEARN);

  return (
    <div className={styles.container}>
      <header>
        <Image src={logo} alt="Foundation UI logo" width={50} height={50} />
        <Typography variant="h4" gutterBottom>
          Foundation UI
        </Typography>
      </header>
      <div className={styles["left-panel"]}>Left Sidebar</div>
      <main>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={selectedTab}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(e, newValue) => setSelectedTab(newValue)}
                aria-label="Choose between Learn and Apply"
              >
                {Object.keys(Tabs).map(function (tab) {
                  return (
                    <Tab
                      key={Tabs[tab as keyof typeof Tabs]}
                      label={TabLabels[Tabs[tab as keyof typeof Tabs]]}
                      value={Tabs[tab as keyof typeof Tabs]}
                    />
                  );
                })}
              </TabList>
            </Box>
            <TabPanel value={Tabs.LEARN}>
              <Typography variant="h5">Learn</Typography>
            </TabPanel>
            <TabPanel value={Tabs.APPLY}>
              <Typography variant="h5">Apply</Typography>
            </TabPanel>
          </TabContext>
        </Box>
      </main>
      <div className={styles["right-panel"]}>Right Sidebar</div>
      <footer>Footer</footer>
    </div>
  );
}
