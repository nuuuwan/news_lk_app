import React, { Component } from "react";
import HomePage from "./view/pages/HomePage.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default class App extends Component {
  render() {
    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <HomePage />
      </ThemeProvider>
    );
  }
}
