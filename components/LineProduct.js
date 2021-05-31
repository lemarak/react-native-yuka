import React from "react";

import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
          source={{
            uri: product.image_url,
          }}
        />
        <View style={styles.detailProduct}>
          <Text style={styles.titleProduct}>{product.product_name}</Text>
          <Text style={styles.brandProduct}>{product.brands}</Text>
          <Score score={product.nutriscore_score} />
          {/* <Text style={styles.brandProduct}>
        score {item.product["nutriscore_grade"]}
      </Text> */}
          <Text>date</Text>
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
    marginLeft: 20,
    justifyContent: "flex-start",
  },
  titleProduct: {
    fontSize: 20,
    fontWeight: "700",
  },
  brandProduct: {
    fontSize: 16,
  },
});
