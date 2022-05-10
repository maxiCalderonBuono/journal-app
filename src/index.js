import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import { JournalApp } from "./JournalApp";

import "./styles/styles.scss";
import theme from "./theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <JournalApp />
  </ChakraProvider>,
  document.getElementById("root")
);
