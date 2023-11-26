import React, { ReactNode } from "react";
import "react-native-gesture-handler";

import { ClerkProvider, useUser } from "@clerk/clerk-expo";
import { tokenCache } from "./utils/cache";
import Constants from "expo-constants";
import HomeScreen from "./screens/home";
import { TRPCProvider } from "./utils/trpc";
import { NavigationContainer } from "@react-navigation/native";
import SingleItemScreen from "./screens/single-item";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "jotai";
import type { RootStackParamList } from "./types/navigation";
import CreateItemScreen from "./screens/create-item";
import jotaiStore from "./atoms/store";

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <Providers>
      <RootNavigator />
    </Providers>
  );
}

function RootNavigator() {
  const { user } = useUser();

  return (
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
      {user?.publicMetadata.isAdmin && (
        <>
          <Stack.Screen name="Create Item" component={CreateItemScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

function Providers({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <TRPCProvider>
        <Provider store={jotaiStore}>
          <NavigationContainer>{children}</NavigationContainer>
        </Provider>
      </TRPCProvider>
    </ClerkProvider>
  );
}

export default App;
