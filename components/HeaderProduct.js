import React from "react";

import { Dimensions, Image, StyleSheet, Text, View } from "react-native";

import Score from "../components/Score";

// Dimensions
const { height, width } = Dimensions.get("window");

const HeaderProduct = ({ product }) => {
  // *********************
  //  HeaderProduct
  // *********************
  return (
    <View style={styles.headerProduct}>
      <Image
        style={styles.imgProduct}
        source={
          product.image_url
            ? {
                uri: product.image_url,
              }
            : require("../assets/img/logo-carotte-empty.png")
        }
      />
      <View style={styles.detailProduct}>
        <Text style={styles.titleProduct} numberOfLines={1}>
          {product.product_name}
        </Text>
        <Text style={styles.brandProduct}>{product.brands}</Text>

        <Score score={product.nutriscore_score} screen="oneProduct" />
      </View>
    </View>
  );
};

export default HeaderProduct;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  headerProduct: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    width: width,
  },
  imgProduct: {
    width: 130,
    height: 180,
    resizeMode: "contain",
  },
  detailProduct: {
    flex: 1,
    paddingHorizontal: 20,
  },
  titleProduct: {
    fontSize: 24,
    fontWeight: "700",
  },
  brandProduct: {
    fontSize: 16,
  },
});
