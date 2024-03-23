import { tagAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const lightMode = definePartsStyle({
  container: {
    bg: "light.primary.100",
    color: "blackAlpha.800",
  },
});

const darkMode = definePartsStyle({
  container: {
    bg: "dark.primary.300",
    color: "whiteAlpha.900",
  },
});

export const tagTheme = defineMultiStyleConfig({
  variants: {
    lightMode: lightMode,
    darkMode: darkMode,
  },
});
