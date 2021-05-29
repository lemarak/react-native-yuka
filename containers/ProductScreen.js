import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../assets/colors";

// Dimensions
const { height, width } = Dimensions.get("window");

// *********************
//  ProductScreen
// *********************

export default function ProductScreen({ route }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //   Get product from API OpenFoodFacts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://fr.openfoodfacts.org/api/v0/product/${route.params.codeProduct}.json`
        );
        if (response.data.code) {
          setProduct(response.data.product);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });

  return isLoading ? (
    <ActivityIndicator size="large" color={colors.greenYuka} />
  ) : (
    <View style={styles.container}>
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
          <Text style={styles.brandProduct}>
            score {product["nutriscore_grade"]}
          </Text>
          <Text>date</Text>
        </View>
      </View>
    </View>
  );
}

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
