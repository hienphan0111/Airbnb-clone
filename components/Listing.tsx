import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

interface ListingsProps {
  listings: any[];
  category: string;
}
const Listings = ({ listings, category}: ListingsProps) => {
  useEffect(() => {
    console.log(listings.length);
  }, [category])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore and travel</Text>
      <Text style={styles.subTitle}>Explore and travel</Text>
    </View>
  );
}

export default Listings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
