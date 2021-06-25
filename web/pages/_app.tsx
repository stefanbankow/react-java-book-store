import "../styles/globals.css";
import theme from "../components/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import PageLayout from "../components/Layout/PageLayout";
import { UserProvider } from "@auth0/nextjs-auth0";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";

import store from "../redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Provider store={store}>
        <ChakraProvider theme={theme}>
          <PageLayout>
            <Head>
              <title>Book store</title>
              <meta
                property="og:index_title"
                content="Book store"
                key="title"
              />
            </Head>
            <Component {...pageProps} />
          </PageLayout>
        </ChakraProvider>
      </Provider>
    </UserProvider>
  );
}
export default MyApp;
