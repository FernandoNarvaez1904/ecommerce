import React, { useMemo, useState } from "react";
import { FlatList, Text, View, Image, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { trpc } from "../utils/trpc";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "@acme/api";

function HomeScreen() {
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
    <SafeAreaView className="px-2">
      <TextInput
        className="my-2 rounded border py-1 pl-3"
        placeholder="Busca un Producto"
        onChangeText={setNameFilter}
      />
      <FlatList
        data={filteredData}
        renderItem={(item) => (
          <View className="w-[49%]">
            <ProductCard item={item.item} key={item.item.id} />
          </View>
        )}
        ItemSeparatorComponent={() => <View className="h-2 w-[2%]" />}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
      />
    </SafeAreaView>
  );
}

export interface ProductCardProps {
  item: inferProcedureOutput<AppRouter["item"]["byId"]>;
}

function ProductCard({ item }: ProductCardProps) {
  return (
    <View className="rounded border border-gray-400 px-2 py-2">
      <Image
        source={{ uri: item.image_url ?? "" }}
        className="h-16"
        resizeMode="contain"
      />
      <Text numberOfLines={1}>{item.name}</Text>
    </View>
  );
}

export default HomeScreen;
