import React from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";
import { create } from "jss";

import rtl from "jss-rtl";

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const theme = createMuiTheme(
  /**
  
   */
  {
    direction: "rtl",
    typography: {
      // fontFamily: ["Poppins"].join(",")
      fontFamily: "iransans"
    },

    palette: {
      primary: {
        // light: will be calculated from palette.primary.main,
        main: "#ff5f00"
        // dark: will be calculated from palette.primary.main,
        // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
      },
      secondary: {
        // light: will be calculated from palette.primary.main,
        main: "#ff5f00"
        // dark: will be calculated from palette.primary.main,
        // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
      },
      error: {
        // light: will be calculated from palette.primary.main,
        main: "#f64e60"
        // dark: will be calculated from palette.primary.main,
        // contrastText: "#fff" //will be calculated to contrast with palette.primary.main
      },
      cutomColor: {
        main: "#ef6d22"
      }
    },

    /**

     */
    props: {
      // Name of the component ⚛️
      MuiButtonBase: {
        // The properties to apply
        disableRipple: false // No more ripple, on the whole application 💣!
      },

      // Set default elevation to 1 for popovers.
      MuiPopover: {
        elevation: 1
      }
    }
  }
);

export function MaterialThemeProvider(props) {
  const { children } = props;
  // console.log('...jssPreset().plugins--------------->' , ...jssPreset().plugins);
  return (
    <ThemeProvider theme={theme}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </ThemeProvider>
  );
}
