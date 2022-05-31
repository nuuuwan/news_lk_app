import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from '@mui/material/Box';
import SriLankaColors from "./view/_constants/SriLankaColors";
import HomePage from "./view/pages/HomePage.js";

import VersionWidget from "./view/molecules/VersionWidget";

const THEME = createTheme({
  palette: {
    primary: {
      main: SriLankaColors.Sinhala,
    },
    secondary: {
      main: SriLankaColors.Tamil,
    },
    success: {
      main: SriLankaColors.Muslim,
    },
    info: {
      main: SriLankaColors.Buddhist,
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    fontSize: 15,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <Box sx={{maxWidth: "90%", width: 700, margin: "auto"}}>
          <HomePage />
          <VersionWidget />
        </Box>
      </ThemeProvider>
    );
  }
}
