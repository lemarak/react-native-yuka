import React, { useState, useEffect } from "react";
import axios from "axios";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

import SplashScreen from "../containers/SplashScreen";
import HeaderProduct from "../components/HeaderProduct";
import DetailProduct from "../components/DetailProduct";

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
  }, []);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <ScrollView style={styles.container}>
      <HeaderProduct product={product} />
      <DetailProduct product={product} />
    </ScrollView>
  );
}

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    width: width,
  },
});
