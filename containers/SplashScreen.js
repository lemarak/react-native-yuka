import React from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chargement...</Text>
      <Image
        style={styles.logo}
        source={require("../assets/img/logo-carotte.png")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 80,
  },
});
