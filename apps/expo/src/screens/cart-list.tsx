import { useAtomValue } from "jotai";
import { cartAtom, cartTotalAtom } from "../atoms/cart";
import CartItem from "../components/CartItem";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useMemo } from "react";

function CartListScreen() {
  const cart = useAtomValue(cartAtom);

  const data = useMemo(() => Object.entries(cart), [cart]);
  const total = useAtomValue(cartTotalAtom);

  return (
    <View className="flex-1 bg-gray-50">
      <View className="mb-2.5 h-12 justify-center border-b border-b-gray-200 bg-white shadow-sm">
        <Text className="ml-2.5 text-lg ">Shopping Cart</Text>
      </View>

      <View className="flex-1 px-2">
        <View className=" flex flex-row items-center justify-between">
          <Text className="text-lg">
            <Text className="text-xl font-medium">Total: </Text>C${" "}
            {total.toFixed(2)}
          </Text>
        </View>

        <View className="mt-1.5 mb-2.5 border-b-[0.5px] border-b-gray-400" />
        <FlatList
          data={data}
          renderItem={(item) => (
            <CartItem
              id={Number(item.item[0])}
              key={item.item[0]}
              quantity={item.item[1]}
            />
          )}
          ItemSeparatorComponent={() => <View className="mt-2.5" />}
          ListFooterComponent={() => <View className="mt-2.5" />}
        />
      </View>
    </View>
  );
}

export default CartListScreen;
