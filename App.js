// App.js
import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import MainContainer from "./navigation/MainContainer";
import { UserProvider } from "./context/userContext";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <UserProvider>
        <MainContainer />
      </UserProvider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
