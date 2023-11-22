import React from "react";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import HomeScreen from "./screens/home";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

function App() {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Selector" component={HomeScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </TRPCProvider>
    </ClerkProvider>
  );
}

export default App;
