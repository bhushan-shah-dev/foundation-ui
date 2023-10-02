"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { StrictMode } from "react";
import theme from "./theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StrictMode>
      <CacheProvider>
        <ChakraProvider theme={theme} cssVarsRoot={undefined}>
          {children}
        </ChakraProvider>
      </CacheProvider>
    </StrictMode>
  );
}
