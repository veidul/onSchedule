import "../styles/globals.css";
import Layout from "./layout";
import { SessionProvider } from "next-auth/react";
import { Provider as JotaiProvider, atom } from "jotai";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={pageProps.session}>
      <JotaiProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </JotaiProvider>
    </SessionProvider>
  );
}

export default MyApp;
