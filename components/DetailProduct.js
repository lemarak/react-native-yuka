import React from "react";

import { StyleSheet, Text, View } from "react-native";

const DetailProduct = ({ product }) => {
  return (
    <View>
      <View style={styles.lineQuality}>
        <Text style={styles.titleQuality}>Qualités</Text>
        <Text style={styles.subtitleQuality}>Pour 100g</Text>
      </View>
    </View>
  );
};

export default DetailProduct;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  lineQuality: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleQuality: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitleQuality: {
    color: "#aaa",
  },
});
