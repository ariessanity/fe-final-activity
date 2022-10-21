import "../styles/globals.css";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { Layout } from "../components/Layout/Layout";
import { wrapper } from "../store/store";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider>
      <Layout>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </Layout>
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
