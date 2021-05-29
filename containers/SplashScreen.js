import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

export default function SplashScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Bienvenue sur Yuka</Text>
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
