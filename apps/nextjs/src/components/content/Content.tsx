import Aside from "../aside/Aside";
import styles from "./Content.module.css";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import { useSetAtom } from "jotai";
import { productsAtom } from "../../atoms/products";
import { useEffect } from "react";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";
import { addItemToCartAtom, deleteItemFromCartAtom } from "../../atoms/cart";

interface ContentProps {
  filterValue: string;
}

function Content({ filterValue }: ContentProps) {
  const { data } = trpc.item.all.useQuery();
  const setItemsAtom = useSetAtom(productsAtom);

  const filteredData =
    data?.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase()),
    ) ?? [];

  useEffect(() => {
    setItemsAtom(data ?? []);
  }, [data, setItemsAtom]);

  return (
    <>
      <div className={styles.container}>
        <Aside></Aside>
        <main>
          {filteredData.map((item) => (
            <ItemCard item={item} key={item.id} />
          ))}
        </main>
      </div>
    </>
  );
}

function ItemCard({
  item,
}: {
  item: inferProcedureOutput<AppRouter["item"]["all"]>[number];
}) {
  const router = useRouter();
  const addToCart = useSetAtom(addItemToCartAtom({ id: item.id, quantity: 1 }));
  const deleteFromCart = useSetAtom(deleteItemFromCartAtom({ id: item.id }));

  return (
    <div
      className={styles.card}
      onClick={() => router.push(`/item/${item.id}`)}
    >
      <picture>
        {" "}
        <img src={item.image_url ? item.image_url : ""} alt={item.name} />
      </picture>
      <h3>{item.name}</h3>
      <p>${item.price.toFixed(2)}</p>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart();
        }}
      >
        Add to cart
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          deleteFromCart();
        }}
      >
        Delete
      </button>
    </div>
  );
}
export default Content;
