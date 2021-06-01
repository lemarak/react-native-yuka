import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";

import SplashScreen from "../containers/SplashScreen";
import HeaderProduct from "../components/HeaderProduct";
import DetailProduct from "../components/DetailProduct";
import LineHeader from "../components/LineHeader";

import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";

// Dimensions
const { height, width } = Dimensions.get("window");

// *********************
//  ProductScreen
// *********************

export default function ProductScreen({
  route,
  navigation,
  favoritesBar,
  setFavoritesBar,
}) {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);

  //   Get product from API OpenFoodFacts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get product from API
        const codeBar = route.params.codeProduct;
        const response = await axios.get(
          `https://fr.openfoodfacts.org/api/v0/product/${codeBar}.json`
        );
        if (response.data.code) {
          setProduct(response.data.product);
          setIsLoading(false);
          // check if product is favorite
          setIsFavorite(favoritesBar.indexOf(codeBar) === -1 ? false : true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const changeFavorite = async () => {
    setIsLoadingFavorite(true);
    const codeBar = route.params.codeProduct;
    const newFavoritesBar = favoritesBar ? [...favoritesBar] : [];

    if (isFavorite) {
      newFavoritesBar.splice(newFavoritesBar.indexOf(codeBar), 1);
      console.log("after delete ", newFavoritesBar);
      setIsFavorite(false);
    } else {
      newFavoritesBar.push(codeBar);
      setIsFavorite(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavoritesBar));
    setFavoritesBar(newFavoritesBar);
    setIsLoadingFavorite(false);
  };

  // *********************
  //  ProductScreen
  // *********************
  return isLoading ? (
    <SplashScreen />
  ) : (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.greenYuka} />
      <View style={styles.header}>
        <Ionicons
          style={styles.headerLeft}
          name="arrow-back"
          size={24}
          color="white"
          onPress={() => navigation.goBack()}
        />
        {isLoadingFavorite ? (
          <ActivityIndicator
            style={styles.headerRight}
            size="small"
            color="white"
          />
        ) : (
          <Ionicons
            style={styles.headerRight}
            name={isFavorite ? "star" : "star-outline"}
            size={24}
            color="white"
            onPress={() => changeFavorite()}
          />
        )}
      </View>

      <ScrollView style={styles.container}>
        <HeaderProduct product={product} />
        <LineHeader />
        <DetailProduct product={product} />
      </ScrollView>
    </>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 44,
    backgroundColor: colors.lightgreenYuka,
  },
  headerLeft: {
    paddingHorizontal: 20,
  },
  headerRight: {
    paddingHorizontal: 20,
  },
});
