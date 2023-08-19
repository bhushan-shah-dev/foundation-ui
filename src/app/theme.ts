import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

const theme = extendTheme(
  withDefaultColorScheme({
    ...config,
    colorScheme: "blue",
  })
);

export default theme;
