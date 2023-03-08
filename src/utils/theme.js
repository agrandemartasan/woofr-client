import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: "#F4F0F2",
      100: "#E1D6DB",
      200: "#CDBCC5",
      300: "#B9A1AE",
      400: "#A68797",
      500: "#926D80",
      600: "#755767",
      700: "#58414D",
      800: "#3A2C33",
      850: "#2B2127",
      900: "#1D161A"
    }
  }
});

export default theme;
