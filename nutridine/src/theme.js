import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/league-spartan";
import "@fontsource-variable/dancing-script";
import { tagTheme } from "../src/screens/userPreferences/Tag";

const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
    cssVarPrefix: "ck",
  },
  styles: {
    global: {
      body: {
        margin: 0,
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      },
      code: {
        fontFamily:
          "source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace",
      },
    },
  },
  colors: {
    transparent: "transparent",
    black: "#000",
    white: "#fff",
    light: {
      primary: {
        50: "#dffdf9",
        100: "#bef0e9",
        200: "#98e4db",
        300: "#72d9cd",
        400: "#4ecfbe",
        500: "#35b5a5",
        600: "#268d80",
        700: "#17655c",
        800: "#053d37",
        900: "#001613",
      },
      secondary: {
        50: "#ffe9e4",
        100: "#fac6ba",
        200: "#f1a28e",
        300: "#e97d62",
        400: "#e25936",
        500: "#c9401d",
        600: "#9d3116",
        700: "#71220e",
        800: "#451306",
        900: "#1d0400",
      },
    },
    dark: {
      primary: {
        50: "#e8eeff",
        100: "#c2ccf2",
        200: "#9aaae4",
        300: "#7388d8",
        400: "#4c65cd",
        500: "#334cb3",
        600: "#273b8c",
        700: "#1b2a65",
        800: "#0e193e",
        900: "#03081a",
      },
      secondary: {
        50: "#ffe9e4",
        100: "#fac6ba",
        200: "#f1a28e",
        300: "#e97d62",
        400: "#e25936",
        500: "#c9401d",
        600: "#9d3116",
        700: "#71220e",
        800: "#451306",
        900: "#1d0400",
      },
    },
  },
  fonts: {
    navbar: `'League Spartan Variable', sans-serif`,
  },
  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    md: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "3.75rem",
    "7xl": "4.5rem",
    "8xl": "6rem",
    "9xl": "8rem",
  },
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },
  lineHeights: {
    normal: "normal",
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: "2",
    3: ".75rem",
    4: "1rem",
    5: "1.25rem",
    6: "1.5rem",
    7: "1.75rem",
    8: "2rem",
    9: "2.25rem",
    10: "2.5rem",
  },
  letterSpacings: {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  },
  breakpoints: {
    base: "0em",
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
  },
  shadows: {
    "md-light":
      "0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -2px rgba(255, 255, 255, 0.1)",
  },
  components: { Tag: tagTheme },
});

export default theme;
