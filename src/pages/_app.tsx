import type { AppProps } from "next/app";

import { AppContextProvider } from "../contexts/AppContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
