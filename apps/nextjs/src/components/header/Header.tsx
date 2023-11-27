import styles from "./Header.module.css";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

interface HeaderProps {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}

function Header({ filterValue, setFilterValue }: HeaderProps) {
  const router = useRouter();
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
            <li>Home</li>
            <li onClick={() => router.push(`/shoppingCart`)}>Shop</li>
            <li onClick={() => router.push(`/login`)}>About</li>
            <li>Contact</li>
          </ul>
        </span>
      </header>
    </>
  );
}
export default Header;
