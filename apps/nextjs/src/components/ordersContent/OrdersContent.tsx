import styles from "./OrdersContent.module.css";
import { trpc } from "../../utils/trpc";
import { isTemplateSpan } from "typescript";
function OrdersContent() {
  const { data } = trpc.order.allMyOrders.useQuery();

  return (
    <>
      <main className={styles.container}>
        <h1>Orders</h1>
        <ul>
          {data?.map((item) => (
            <li className={styles.orderItem} key={item.id}>
              <span className={styles.orderId}>no. {item.id}</span>
              <span className={styles.itemName}>
                {item.orderitems[0]?.name}...
              </span>
              {/* <span className={styles.clientName}>{}</span> */}
              <span className={styles.quantity}>
                # of items: {item.orderitems.length}
              </span>
              <span className={styles.price}>$ {item.total.toFixed(2)}</span>
              <button className={styles.deleteBtn}>delete order</button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
export default OrdersContent;
