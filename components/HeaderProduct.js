import React from "react";

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Score from "../components/Score";

// Dimensions
const { height, width } = Dimensions.get("window");

const HeaderProduct = ({ product }) => {
  // *********************
  //  HeaderProduct
  // *********************
  return (
    <View>
      <View style={styles.lineProduct}>
        <Image
          style={styles.imgProduct}
          source={{
            uri: product.image_url,
          }}
        />
        <View style={styles.detailProduct}>
          <Text style={styles.titleProduct} numberOfLines={1}>
            {product.product_name}
          </Text>
          <Text style={styles.brandProduct}>{product.brands}</Text>

          <Score score={product.nutriscore_score} />
        </View>
      </View>
    </View>
  );
};

export default HeaderProduct;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  lineProduct: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    width: width,
  },
  imgProduct: {
    width: 150,
    height: 200,
    resizeMode: "contain",
  },
  detailProduct: {
    flex: 1,
    marginLeft: 20,
    justifyContent: "flex-start",
  },
  titleProduct: {
    fontSize: 24,
    fontWeight: "700",
  },
  brandProduct: {
    fontSize: 16,
  },
});
