import ShoppingCartContent from "../components/shoppingCartContent/ShoppingCartContent";
import ItemHeader from "../components/ItemHeader/ItemHeader";
import { trpc } from "../utils/trpc";
import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { productsAtom } from "../atoms/products";

function ShoppingCart() {
  const { data } = trpc.item.all.useQuery();

  const setItemsAtom = useSetAtom(productsAtom);

  useEffect(() => {
    setItemsAtom(data ?? []);
  }, [data, setItemsAtom]);

  return (
    <>
      <ItemHeader />
      <ShoppingCartContent />
    </>
  );
}
export default ShoppingCart;
