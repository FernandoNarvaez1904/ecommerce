import { useAtom, useAtomValue, useSetAtom } from "jotai";
import styles from "./ShoppingCartContent.module.css";
import {
  cartAtom,
  cartItemQuantityAtomFamily,
  cartTotalAtom,
  deleteItemFromCartAtom,
} from "../../atoms/cart";
import { singleProductAtomFamily } from "../../atoms/products";
import { it } from "node:test";

function ShoppingCartContent() {
  const cart = useAtomValue(cartAtom);
  const total = useAtomValue(cartTotalAtom);

  return (
    <>
      <main className={styles.content}>
        <section className={styles.items}>
          <h2> Shopping Cart </h2>
          <ul>
            {Object.keys(cart).map((cartItemId) => (
              <li className={styles.itemList} key={cartItemId}>
                <CartItem id={Number(cartItemId)} />
              </li>
            ))}
          </ul>
        </section>
        <aside className={styles.price}>
          <h2>Price Summary</h2>
          <dl className={styles.grandTotal}>
            <dt>Total</dt>
            <dd>$ {total}</dd>
          </dl>
          <button>Complete Checkout</button>
        </aside>
      </main>
    </>
  );
}

function CartItem({ id }: { id: number }) {
  const item = useAtomValue(singleProductAtomFamily(id));
  const [quantity, setQuantity] = useAtom(cartItemQuantityAtomFamily(id));
  const deleteFromCart = useSetAtom(deleteItemFromCartAtom({ id }));

  return (
    <div className={styles.item}>
      <span className={styles.image}>
        <img src={item?.image_url ?? ""} alt={item?.name} />
      </span>
      <span className={styles.details}>
        <h3>{item?.name}</h3>
        <p>$ {item?.price.toFixed(2)}</p>
      </span>
      <span className={styles.quantity}>
        <div className={styles.quantityBox}>
          <input
            type="number"
            name="quantityBox"
            className={styles.quantityInput}
            min={1}
            max={item?.stock.toNumber() ?? 0}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.currentTarget.value))}
          />
        </div>
      </span>
      <span className={styles.totalPrice}>
        $ {item?.price.toNumber() ?? 0 * quantity}
      </span>
      <span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteFromCart();
          }}
          className={styles.deletebtn}
        >
          X
        </button>
      </span>
    </div>
  );
}
export default ShoppingCartContent;
