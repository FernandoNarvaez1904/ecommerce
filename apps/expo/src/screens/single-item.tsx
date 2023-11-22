import { StackScreenProps } from "@react-navigation/stack";
import { MainNavigationStack, MainNavigationStackParams } from "../_app";
import { ActivityIndicator, Image, Text, View } from "react-native";
import { trpc } from "../utils/trpc";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export type SingleItemScreenProps = StackScreenProps<
  MainNavigationStackParams,
  "SingleItemScreen"
>;

function SingleItemScreen({ route }: SingleItemScreenProps) {
  const nav = useNavigation<MainNavigationStack>();
  const { data } = trpc.item.byId.useQuery({ id: route.params.id });

  useEffect(() => {
    nav.setOptions({ title: data?.name ?? "Loading Item" });
  }, [data?.name]);

  return (
    <View className="h-full bg-white px-2 pt-4">
      {data?.image_url ? (
        <Image
          source={{ uri: data?.image_url }}
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
            {data?.price ? (
              <Text className="font-normal"> C$ {data.price.toNumber()}</Text>
            ) : (
              <Text className="text-base font-normal">Free</Text>
            )}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">
            Stock:
            {data?.stock ? (
              <Text className="font-normal">
                {" "}
                {data.stock.toNumber().toFixed(2)}
              </Text>
            ) : (
              <Text className="text-base font-normal">0.00</Text>
            )}
          </Text>
        </View>
        <View>
          <Text className="text-lg font-semibold">Description:</Text>

          {data?.description ? (
            <Text className="text-lg">{data?.description}</Text>
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
