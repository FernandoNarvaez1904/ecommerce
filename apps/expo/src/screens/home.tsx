import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemListScreen from "./item-list";
import ProfileScreen from "./profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeTabParamList } from "../types/navigation";
import CartListScreen from "./cart-list";

const Tab = createBottomTabNavigator<HomeTabParamList>();

function HomeScreen() {
  return (
    <SafeAreaView className="h-full">
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Search" component={ItemListScreen} />
        <Tab.Screen name="Cart" component={CartListScreen} />
        <Tab.Screen name="My Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default HomeScreen;
