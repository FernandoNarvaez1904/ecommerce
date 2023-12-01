import { useRouter } from "next/router";
import styles from "./Header.module.css";
import { useAuth } from "@clerk/nextjs";

function ItemHeader() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
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
            <li
              onClick={() =>
                isSignedIn
                  ? signOut(() => router.push(`/`))
                  : router.push(`/login`)
              }
            >
              {isSignedIn ? "logout" : "login"}
            </li>
            <li onClick={() => router.push(`/orders`)}>Orders</li>
          </ul>
        </span>
      </header>
    </>
  );
}
export default ItemHeader;
