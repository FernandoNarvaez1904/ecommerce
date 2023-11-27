import type { NextPage } from "next";
import Header from "../components/header/Header";
import Content from "../components/content/Content";
import { useState } from "react";

const Home: NextPage = () => {
  const [filterName, setFilterName] = useState("");

  return (
    <>
      <Header filterValue={filterName} setFilterValue={setFilterName} />
      <Content filterValue={filterName} />
    </>
  );
};

export default Home;
