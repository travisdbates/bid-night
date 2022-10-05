import "../styles/globals.css";
import type { AppProps } from "next/app";

import {
  ChakraProvider,
  extendTheme,
  theme as chakraTheme,
  Center,
  Heading,
} from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#0A2C3F",
      200: "#0A2C0F",
      300: "#BDF8FF",
      500: "#E6D1BC",
      700: "#747474",
      900: "#FFFFFF",
    },
  },
  fonts: {
    ...chakraTheme.fonts,
    body: `Roboto Condensed, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
    heading: `Oswald, -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  },
});

import { supabase } from "~/lib/supabase";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
