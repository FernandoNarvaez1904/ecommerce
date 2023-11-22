import React, { useMemo, useState } from "react";
import { FlatList, View, TextInput } from "react-native";
import { trpc } from "../utils/trpc";
import ProductCard from "../components/ProductCard";

function ItemListScreen() {
  const { data } = trpc.item.all.useQuery();

  const [nameFilter, setNameFilter] = useState("");

  const filteredData = useMemo(
    () =>
      data?.filter((item) =>
        item.name.toLowerCase().includes(nameFilter.toLocaleLowerCase()),
      ) ?? [],
    [nameFilter, data],
  );

  return (
    <View className="flex-1 bg-gray-50 px-2">
      <TextInput
        className="my-2 rounded border border-gray-200 bg-white py-1.5 pl-3 shadow-lg"
        placeholder="Busca un Producto"
        onChangeText={setNameFilter}
      />
      <FlatList
        data={filteredData}
        renderItem={(item) => (
          <ProductCard item={item.item} key={item.item.id} />
        )}
        ItemSeparatorComponent={() => <View className="mt-2.5" />}
        ListFooterComponent={() => <View className="mt-2.5" />}
      />
    </View>
  );
}

export default ItemListScreen;
