import styles from "./Aside.module.css";
function Aside() {
  return (
    <>
      <aside className={styles.aside}>
        <h2>Categories</h2>
        <ul>
          <li>Clothing</li>
          <li>Electronics</li>
          <li>Home & kitchen</li>
          <li>Books</li>
          <li>Toys</li>
        </ul>
      </aside>
    </>
  );
}
export default Aside;
