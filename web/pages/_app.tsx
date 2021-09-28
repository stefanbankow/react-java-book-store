import "../styles/globals.css";
import theme from "../components/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import PageLayout from "../components/Layout/PageLayout";
import Head from "next/head";
import React from "react";
import { Provider } from "react-redux";

import store from "../redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_BASE_URL}
      audience={process.env.NEXT_PUBLIC_AUTH0_AUDIENCE}
    >
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
    </Auth0Provider>
  );
}
export default MyApp;
