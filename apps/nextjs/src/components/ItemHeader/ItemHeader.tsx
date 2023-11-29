import { useRouter } from "next/router";
import styles from "./Header.module.css";

function ItemHeader() {
  const router = useRouter();
  return (
    <>
      <header className={styles.header}>
        <span className={styles.logoSpan}>
          <img src="logo" alt="header-logo" />
        </span>
        <span className={styles.listSpan}>
          <ul>
            <li onClick={() => router.push(`/`)}>Home</li>
            <li onClick={() => router.push(`/shoppingCart`)}>Cart</li>
            <li onClick={() => router.push(`/login`)}>Login</li>
            <li>Contact</li>
          </ul>
        </span>
      </header>
    </>
  );
}
export default ItemHeader;
