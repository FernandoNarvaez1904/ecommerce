import type { NextPage } from "next";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data } = trpc.item.all.useQuery();

  return (
    <>
      {data?.map((item) => (
        <p key={item}>{item}</p>
      ))}
    </>
  );
};

export default Home;
