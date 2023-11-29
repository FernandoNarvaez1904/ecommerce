import { useAuth } from "@clerk/nextjs";
import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

function Header({ filterValue, setFilterValue }: HeaderProps) {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  return (
    <>
      <header className={styles.header}>
        <span className={styles.logoSpan}>
          <img src="logo" alt="header-logo" />
          <input
            type="search"
            id={styles.searchBar}
            placeholder="🔍 Search products..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.currentTarget.value)}
          ></input>
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
export default Header;
