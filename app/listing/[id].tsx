import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";

const Page = () => {
  const { id} = useLocalSearchParams<{id: string}>();
  console.log(id);
  return (
    <View>
      <Text>Booking</Text>
    </View>
  )
}

export default Page;
