import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { View, Text, StyleSheet, TextInput } from "react-native";

const Login = () => {
  useWarmUpBrowser();
  return (
    <View style={styles.container}>
      <TextInput autoCapitalize="none" placeholder="Email" />
      <Text>Login</Text>
    </View>
  )
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  }
})