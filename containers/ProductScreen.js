import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
} from "react-native";
import colors from "../assets/colors";

// Dimensions
const { height, width } = Dimensions.get("window");

export default function ProductScreen({ route }) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //   Get product from API OpenFoodFacts
  useEffect(() => {
    const fetchData = async () => {
      console.log("param :", route.params.codeProduct);
      try {
        const response = await axios.get(
          `https://fr.openfoodfacts.org/api/v0/product/${route.params.codeProduct}.json`
        );
        console.log(response.data.code);
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
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Détail produit</Text>
      <Text>{product.product_name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
