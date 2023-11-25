import { atom } from "jotai";
import { atomFamily, atomWithStorage, createJSONStorage } from "jotai/utils";
import { singleProductAtomFamily } from "./products";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const cartAtom = atomWithStorage<Record<number, number>>(
  "cart",
  {},
  createJSONStorage(() => AsyncStorage),
);

export const cartItemQuantityAtomFamily = atomFamily((id: number) =>
  atom(async (get) => {
    return (await get(cartAtom))[id] ?? 0;
  }),
);

export const addItemToCartAtom = atomFamily(
  ({ id, quantity }: { id: number; quantity: number }) =>
    atom(null, async (get, set) => {
      const currentCart = await get(cartAtom);
      const currentQuantity = currentCart[id];
      const currentItemStock =
        get(singleProductAtomFamily(id))?.stock.toNumber() ?? 0;

      const q = currentQuantity ? currentQuantity + quantity : quantity;

      if (q <= currentItemStock) {
        set(cartAtom, { ...currentCart, [id]: q });
      } else if (q < 0) {
        // prevents negative quantity
        set(cartAtom, { ...currentCart, [id]: 0 });
      } else {
        set(cartAtom, { ...currentCart, [id]: currentItemStock });
      }
    }),
);
