import React from "react";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material";

import { ThemeContext } from "./contexts";
import { Themes } from "./utils";

const AppTheme = (props) => {
  let [theme, setTheme] = React.useState({
    name: Themes.default,
  });

  const giveMeTheme = () => {
    let currentThemeJson;

    //Geting the theme json for  the selected theme
    switch (theme.name) {
      case Themes.default:
        currentThemeJson = require("./themes/default.json");
        break;

      case Themes.dark:
        currentThemeJson = require("./themes/dark.json");
        break;

      default:
        currentThemeJson = require("./themes/default.json");
        break;
    }

    //Creating a Theme with json
    let currentTheme = createTheme(currentThemeJson);

    //Making theme work with responsive font size
    currentTheme = responsiveFontSizes(currentTheme);

    return currentTheme;
  };

  return (
    <ThemeContext.Provider value={{ ...theme, setTheme }}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={giveMeTheme()}>{props.children}</ThemeProvider>
      </StyledEngineProvider>
    </ThemeContext.Provider>
  );
};

export default AppTheme;
