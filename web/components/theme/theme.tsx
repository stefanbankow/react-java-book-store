import { extendTheme } from "@chakra-ui/react";

const theme = {
  colors: {
    brand: {
      100: "#FBFBFB",
      200: "#ECECEC",
      300: "#303030",
    },
  },
  fonts: {
    heading: "Lucida Bright",
    body: "Lucida Bright",
  },
  components: {
    Text: {
      baseStyle: {
        color: "brand.300",
      },
    },
    Heading: {
      baseStyle: {
        color: "brand.300",
      },
    },
  },
};

export default extendTheme(theme);
