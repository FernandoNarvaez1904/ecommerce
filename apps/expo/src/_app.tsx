import { StatusBar } from "expo-status-bar";
import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import HomeScreen from "./screens/home";
import { TRPCProvider } from "./utils/trpc";

function App() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <HomeScreen />
        <StatusBar />
      </TRPCProvider>
    </ClerkProvider>
  );
}

export default App;
