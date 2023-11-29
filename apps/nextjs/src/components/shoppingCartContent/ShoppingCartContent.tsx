import styles from "./ShoppingCartContent.module.css";
function ShoppingCartContent() {
  return (
    <>
      <main className={styles.content}>
        <section className={styles.items}>
          <h2> Shopping Cart </h2>
          <ul>
            <li className={styles.itemList}>
              <div className={styles.item}>
                <span className={styles.image}>
                  <img src="#" alt="itemImage" />
                </span>
                <span className={styles.details}>
                  <h3>Coca cola con pan y leche</h3>
                  <p>price</p>
                </span>
                <span className={styles.quantity}>
                  <div className={styles.quantityBox}>
                    <input
                      type="number"
                      name="quantityBox"
                      className={styles.quantityInput}
                      min={1}
                      max={9999}
                      placeholder="1"
                    />
                  </div>
                </span>
                <span className={styles.totalPrice}> totalPrice </span>
                <span>
                  <button className={styles.deletebtn}>X</button>
                </span>
              </div>
            </li>
            <li className={styles.itemList}>
              <div className={styles.item}>
                <span className={styles.image}>
                  <img src="#" alt="itemImage" />
                </span>
                <span className={styles.details}>
                  <h3>Coca cola con pan y leche</h3>
                  <p>price</p>
                </span>
                <span className={styles.quantity}>
                  <div className={styles.quantityBox}>
                    <input
                      type="number"
                      name="quantityBox"
                      className={styles.quantityInput}
                      min={1}
                      max={9999}
                      placeholder="1"
                    />
                  </div>
                </span>
                <span className={styles.totalPrice}> totalPrice </span>
                <span>
                  <button className={styles.deletebtn}>X</button>
                </span>
              </div>
            </li>
            <li className={styles.itemList}>
              <div className={styles.item}>
                <span className={styles.image}>
                  <img src="#" alt="itemImage" />
                </span>
                <span className={styles.details}>
                  <h3>Coca cola con pan y leche</h3>
                  <p>price</p>
                </span>
                <span className={styles.quantity}>
                  <div className={styles.quantityBox}>
                    <input
                      type="number"
                      name="quantityBox"
                      className={styles.quantityInput}
                      min={1}
                      max={9999}
                      placeholder="1"
                    />
                  </div>
                </span>
                <span className={styles.totalPrice}> totalPrice </span>
                <span>
                  <button className={styles.deletebtn}>X</button>
                </span>
              </div>
            </li>
            <li className={styles.itemList}>
              <div className={styles.item}>
                <span className={styles.image}>
                  <img src="#" alt="itemImage" />
                </span>
                <span className={styles.details}>
                  <h3>Coca cola con pan y leche</h3>
                  <p>price</p>
                </span>
                <span className={styles.quantity}>
                  <div className={styles.quantityBox}>
                    <input
                      type="number"
                      name="quantityBox"
                      className={styles.quantityInput}
                      min={1}
                      max={9999}
                      placeholder="1"
                    />
                  </div>
                </span>
                <span className={styles.totalPrice}> totalPrice </span>
                <span>
                  <button className={styles.deletebtn}>X</button>
                </span>
              </div>
            </li>
          </ul>
        </section>
        <aside className={styles.price}>
          <h2>Price Summary</h2>
          <dl className={styles.subtotal}>
            <dt>Subtotal</dt>
            <dd>quantity</dd>
          </dl>
          <dl className={styles.grandTotal}>
            <dt>Total</dt>
            <dd>quantity</dd>
          </dl>
          <button>Complete Checkout</button>
        </aside>
      </main>
    </>
  );
}
export default ShoppingCartContent;
