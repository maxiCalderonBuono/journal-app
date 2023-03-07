import { extendTheme, theme } from "@chakra-ui/react";

const breakpoints = {
  sm: "487px",
  md: "768px",
  lg: "1050px",
  xl: "1200px",
  "2xl": "1536px",
};

export default extendTheme({
  breakpoints,
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    primary: "#5c62c5",
    dark_primary: "#383e9d",
    text: theme.colors.whiteAlpha,
    back: theme.colors.gray,
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
    },
  },
});
