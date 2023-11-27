import { trpc } from "../../utils/trpc";
import styles from "./ItemContent.module.css";
interface itemProp {
  itemId: number;
}
function ItemContent({ itemId }: itemProp) {
  const { data } = trpc.item.byId.useQuery({ id: itemId });
  return (
    <>
      <main className={styles.content}>
        <figure className={styles.imageWrapper}>
          <img
            className={styles.image}
            src={data?.image_url != null ? data.image_url : ""}
            alt="item.name"
          />
        </figure>
        <section className={styles.itemInfo}>
          <h1 className={styles.itemName}>{data?.name}</h1>
          <div>
            <p>In stock: {data?.stock.toNumber()}</p>
            <p id="price">${data?.price.toFixed(2)}</p>
            <span className={styles.quantity}>
              <label>Quantity</label>
              <div className={styles.quantityBox}>
                <input
                  type="number"
                  name="quantityBox"
                  className={styles.quantityInput}
                  min={1}
                  max={data?.stock.toNumber()}
                  placeholder="1"
                />
              </div>
            </span>
          </div>
          <div className={styles.buttonDiv}>
            <button type="button">Add to cart</button>
            <button type="button">Checkout</button>
          </div>
          <p>{data?.description}</p>
        </section>
      </main>
    </>
  );
}
export default ItemContent;
