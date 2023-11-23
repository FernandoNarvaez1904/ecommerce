import { StackScreenProps } from "@react-navigation/stack";
import { MainNavigationStack, MainNavigationStackParams } from "../_app";
import { Image, Text, View } from "react-native";
import { trpc } from "../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { singleProductAtomFamily } from "../atoms/products";

export type SingleItemScreenProps = StackScreenProps<
  MainNavigationStackParams,
  "SingleItemScreen"
>;

function SingleItemScreen({ route }: SingleItemScreenProps) {
  const nav = useNavigation<MainNavigationStack>();
  const item = useAtomValue(singleProductAtomFamily(route.params.id));

  useEffect(() => {
    nav.setOptions({ title: item?.name ?? "Loading Item" });
  }, [item?.name]);

  if (!item) {
    return (
      <Text className="mt-4 self-center">
        Item with id: {route.params.id} does not exist
      </Text>
    );
  }

  return (
    <View className="h-full bg-white px-2 pt-4">
      {item?.image_url ? (
        <Image
          source={{ uri: item?.image_url }}
          resizeMode="contain"
          className="h-48 "
        />
      ) : (
        <View className="margin-0 h-48 w-48 items-center justify-center self-center rounded border border-gray-200 bg-gray-50">
          <Text className="text-lg  text-gray-500">No Image</Text>
        </View>
      )}

      <View className="flex gap-1.5 pl-4 pt-2.5">
        <View>
          <Text className="text-lg font-semibold">
            Price:
            {item?.price ? (
              <Text className="font-normal"> C$ {item.price.toNumber()}</Text>
            ) : (
              <Text className="text-base font-normal">Free</Text>
            )}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">
            Stock:
            {item?.stock ? (
              <Text className="font-normal">
                {" "}
                {item.stock.toNumber().toFixed(2)}
              </Text>
            ) : (
              <Text className="text-base font-normal">0.00</Text>
            )}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">Description:</Text>

          {item?.description ? (
            <Text className="text-lg">{item?.description}</Text>
          ) : (
            <Text className="text-lg  text-gray-500">
              There is no description available
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

export default SingleItemScreen;
