import Aside from "../aside/Aside";
import styles from "./Content.module.css";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";

interface ContentProps {
  filterValue: string;
}

function Content({ filterValue }: ContentProps) {
  const { data } = trpc.item.all.useQuery();
  const router = useRouter();

  const filteredData =
    data?.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase()),
    ) ?? [];

  return (
    <>
      <div className={styles.container}>
        <Aside></Aside>
        <main>
          {filteredData.map((item) => (
            <span
              className={styles.card}
              key={item.id}
              onClick={() => router.push(`/item/${item.id}`)}
            >
              <picture>
                <img
                  src={item.image_url != null ? item.image_url : ""}
                  alt="product"
                />
              </picture>
              <h3>{item.name}</h3>
              <p>${item.price.toFixed(2)}</p>
              <button type="button">Add to cart</button>
            </span>
          ))}
        </main>
      </div>
    </>
  );
}
export default Content;
