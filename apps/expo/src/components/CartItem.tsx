import { useAtomValue } from "jotai";
import { singleProductAtomFamily } from "../atoms/products";
import { Text } from "react-native";

function CartItem({ id, quantity }: { id: number; quantity: number }) {
  const item = useAtomValue(singleProductAtomFamily(id));

  return (
    <Text>
      {item?.name} : {quantity}
    </Text>
  );
}

export default CartItem;
