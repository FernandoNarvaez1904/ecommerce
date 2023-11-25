import { useAtomValue } from "jotai";
import { cartAtom } from "../atoms/cart";
import CartItem from "../components/CartItem";

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

export default CartScreen;
