import React from "react";

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";

import Score from "../components/Score";

// Dimensions
const { height, width } = Dimensions.get("window");

const LineProduct = ({ navigation, product, codeBar }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Product", { codeProduct: codeBar });
      }}
    >
      <View style={styles.lineProduct}>
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
            {product.product_name}{" "}
          </Text>
          <Text style={styles.brandProduct} numberOfLines={1}>
            {product.brands}
          </Text>
          <Score score={product.nutriscore_score} screen="products" />
          {/* <Text style={styles.brandProduct}>
        score {item.product["nutriscore_grade"]}
      </Text> */}
          <View style={styles.date}>
            <MaterialIcons
              name="update"
              size={20}
              color="grey"
              style={{ marginRight: 6 }}
            />
            <Text>date</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LineProduct;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  lineProduct: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
    width: width,
  },
  imgProduct: {
    width: 100,
    height: 150,
    resizeMode: "contain",
  },
  detailProduct: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "flex-start",
  },
  titleProduct: {
    fontSize: 20,
    fontWeight: "700",
  },
  brandProduct: {
    fontSize: 18,
    color: "grey",
  },
  date: {
    flexDirection: "row",
    marginTop: 4,
  },
});
