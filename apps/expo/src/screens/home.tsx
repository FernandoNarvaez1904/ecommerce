import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemListScreen from "./item-list";
import ProfileScreen from "./profile";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAtomValue } from "jotai";
import { cartAtom } from "../atoms/cart";
import CartItem from "../components/CartItem";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <SafeAreaView className="h-full">
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Search" component={ItemListScreen} />
        <Tab.Screen name="Cart" component={CartScreen} />
        <Tab.Screen name="My Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

function CartScreen() {
  const cart = useAtomValue(cartAtom);

  return (
    <>
      {Object.entries(cart).map(([key, value]) => (
        <CartItem id={Number(key)} key={key} quantity={value} />
      ))}
    </>
  );
}

export default HomeScreen;
