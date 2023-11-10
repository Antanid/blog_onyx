import Layout from "@/components/Layout/layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ProviderAuth } from "../components/ProviderAuth/Provider";

export default function App({ Component, pageProps }: AppProps) {
  if (typeof window !== 'undefined' && typeof window.Headers !== 'function') {
    window.Headers = require('node-fetch').Headers;
  }
  return (
    <Provider store={store}>
      <ProviderAuth>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProviderAuth>
    </Provider>
  );
}
