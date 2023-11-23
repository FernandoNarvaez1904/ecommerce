import React, { ReactNode } from "react";
import "react-native-gesture-handler";

import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import HomeScreen from "./screens/home";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import SingleItemScreen from "./screens/single-item";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "jotai";

export type MainNavigationStackParams = {
  HomeScreen: undefined;
  SingleItemScreen: { id: number };
};

export type MainNavigationStack = NavigationProp<MainNavigationStackParams>;

const Stack = createNativeStackNavigator<MainNavigationStackParams>();

function App() {
  return (
    <Providers>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "black",
          animation: "slide_from_bottom",
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="SingleItemScreen" component={SingleItemScreen} />
      </Stack.Navigator>
    </Providers>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <Provider>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      </TRPCProvider>
    </ClerkProvider>
  );
}

export default App;
