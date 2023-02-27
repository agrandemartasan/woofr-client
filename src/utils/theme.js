import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      100: "#DDD3CB",
      200: "#B095A3",
      300: "#CAAE92",
      400: "#EAE9E8",
      500: "#CAB7A6",
      600: "#98928C"
    }
  }
});

export default theme;
