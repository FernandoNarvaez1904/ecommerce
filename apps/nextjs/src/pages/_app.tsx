// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import { Provider } from "jotai";
import jotaiStore from "../atoms/store";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Provider store={jotaiStore}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
