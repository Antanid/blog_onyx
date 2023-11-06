import Layout from "@/components/Layout/layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ProviderAuth } from "../components/ProviderAuth/Provider";

export default function App({ Component, pageProps }: AppProps) {
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
