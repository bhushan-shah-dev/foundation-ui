"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { StrictMode } from "react";
import "./globals.scss";

const roboto = Roboto({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Foundation UI",
  description: "An AI Assistant",
};

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StrictMode>
      <CssBaseline enableColorScheme />
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={roboto.className}>{children}</body>
        </html>
      </ThemeProvider>
    </StrictMode>
  );
}
