import React from "react";

import { StyleSheet, Text, View } from "react-native";

import LineScore from "./LineScore";

const DetailProduct = ({ product }) => {
  return (
    <View>
      <View style={styles.lineQuality}>
        <Text style={styles.titleQuality}>Qualités</Text>
        <Text style={styles.subtitleQuality}>
          {product.nutriscore_data.is_beverage ? "Pour 100ml" : "Pour 100g"}
        </Text>
      </View>
      {product.nutriscore_data.energy_points <= 2 && (
        <LineScore
          score={product.nutriscore_data.energy_points}
          itemScore="Calories"
          value={product.nutriscore_data.energy_points}
        />
      )}
      <View style={styles.lineQuality}>
        <Text style={styles.titleQuality}>Défauts</Text>
        <Text style={styles.subtitleQuality}>
          {product.nutriscore_data.is_beverage ? "Pour 100ml" : "Pour 100g"}
        </Text>
      </View>
      {product.nutriscore_data.energy_points > 2 && (
        <LineScore
          score={product.nutriscore_data.energy_points}
          itemScore="Calories"
          value={product.nutriscore_data.energy_points}
        />
      )}
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
    paddingHorizontal: 10,
    marginTop: 10,
  },
  titleQuality: {
    fontSize: 22,
    fontWeight: "700",
  },
  subtitleQuality: {
    color: "#aaa",
  },
});
