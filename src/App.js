import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#800",
    },
    secondary: {
      main: "#f80",
    },
  },
  typography: {
    fontFamily: ["Nunito Sans", "sans-serif"].join(","),
    fontSize: 12,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
