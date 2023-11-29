import { useState } from "react";
import { useRouter } from "next/router";
import ItemHeader from "../../components/ItemHeader/ItemHeader";
import ItemContent from "../../components/itemContent/ItemContent";
function Item() {
  const router = useRouter();
  const id = Number(router.query.id);
  return (
    <>
      <ItemHeader />
      <ItemContent itemId={id} />
    </>
  );
}

export default Item;
