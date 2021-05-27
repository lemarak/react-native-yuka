import React from "react";
import { useNavigation } from "@react-navigation/core";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  SafeAreaView,
} from "react-native";

export default function ProductsScreen({ products }) {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <Text>Bienvenue sur Yuka</Text>
      <Text>{products}</Text>
      <Button
        title="Product"
        onPress={() => {
          navigation.navigate("Product", {});
        }}
      />
      <Button
        title="Camera"
        onPress={() => {
          navigation.navigate("Camera", {});
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
