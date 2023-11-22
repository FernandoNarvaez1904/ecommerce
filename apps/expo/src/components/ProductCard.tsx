import type { AppRouter } from "@acme/api";
import type { inferProcedureOutput } from "@trpc/server";
import { memo } from "react";
import { View, Image, Text } from "react-native";

export interface ProductCardProps {
  item: inferProcedureOutput<AppRouter["item"]["byId"]>;
}

function ProductCard({ item }: ProductCardProps) {
  const hasStock = item.stock.greaterThan(0);

  return (
    <View className="flex flex-row items-center rounded border border-gray-200 bg-white p-2 py-4 shadow">
      <Image
        source={{ uri: item.image_url ?? "" }}
        className="h-20 w-20"
        resizeMode="contain"
      />
      <View className="flex h-full items-start ">
        <Text numberOfLines={1} className="text-base font-semibold">
          {item.name}
        </Text>

        {hasStock && (
          <Text numberOfLines={1} className="font-base text-lg">
            {item.price ? `C$ ${item.price}` : "Free"}
          </Text>
        )}

        <View>
          {hasStock ? (
            <Text className="text-base text-green-900">
              {item.stock.toNumber()} Disponible
            </Text>
          ) : (
            <View>
              <Text className="text-base text-red-900">No Disponible</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

export default memo(ProductCard);
