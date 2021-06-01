import React from "react";

import { StyleSheet, Text, View } from "react-native";

import LineScore from "./LineScore";

const DetailProduct = ({ product }) => {
  return (
    <View>
      {/* Qualites */}
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
          value={product.nutriments["energy-kcal_100g"]}
        />
      )}
      {product.nutriscore_data.saturated_fat_points <= 2 && (
        <LineScore
          score={product.nutriscore_data.saturated_fat_points}
          itemScore="Graisses saturées"
          value={product.nutriscore_data.saturated_fat}
        />
      )}
      {product.nutriscore_data.sodium_points <= 2 && (
        <LineScore
          score={product.nutriscore_data.sodium_points}
          itemScore="Sel"
          value={product.nutriments.salt_100g}
        />
      )}
      {product.nutriscore_data.sugars_points <= 2 && (
        <LineScore
          score={product.nutriscore_data.sugars_points}
          itemScore="Sucre"
          value={product.nutriments.sugars_100g}
        />
      )}
      {product.nutriscore_data.fiber_points <= 2 && (
        <LineScore
          score={product.nutriscore_data.fiber_points}
          itemScore="Fibres"
          value={product.nutriments.fiber_100g}
        />
      )}

      {/* Defaults */}
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
          value={product.nutriments["energy-kcal_100g"]}
        />
      )}
      {product.nutriscore_data.saturated_fat_points > 2 && (
        <LineScore
          score={product.nutriscore_data.saturated_fat_points}
          itemScore="Graisses saturées"
          value={product.nutriscore_data.saturated_fat}
        />
      )}
      {product.nutriscore_data.sodium_points > 2 && (
        <LineScore
          score={product.nutriscore_data.sodium_points}
          itemScore="Sel"
          value={product.nutriments.salt_100g}
        />
      )}
      {product.nutriscore_data.sugars_points > 2 && (
        <LineScore
          score={product.nutriscore_data.sugars_points}
          itemScore="Sucre"
          value={product.nutriments.sugars_100g}
        />
      )}
      {product.nutriscore_data.fiber_points > 2 && (
        <LineScore
          score={product.nutriscore_data.fiber_points}
          itemScore="Fibres"
          value={product.nutriments.fiber_100g}
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
