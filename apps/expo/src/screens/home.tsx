import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ItemListScreen from "./item-list";

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Selector" component={ItemListScreen} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
