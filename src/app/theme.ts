import {
  extendTheme,
  withDefaultColorScheme,
  type ThemeConfig,
} from "@chakra-ui/react";
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme(
  withDefaultColorScheme({
    ...config,
    colorScheme: "blue",
  })
);

export default theme;
