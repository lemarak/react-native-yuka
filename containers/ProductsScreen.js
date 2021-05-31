import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import SplashScreen from "../containers/SplashScreen";
import LineProduct from "../components/LineProduct";

import colors from "../assets/colors";

// *********************
//  ProductsScreen
// *********************

export default function ProductsScreen({
  productsBar,
  setProductsBar,
  setFavoritesBar,
  navigation,
}) {
  // states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProduct, setHasProduct] = useState(false);

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      // check if products not empty
      const tempData = [];

      if (productsBar) {
        for (let i = 0; i < productsBar.length; i++) {
          try {
            const code = productsBar[i];
            const response = await axios.get(
              `https://fr.openfoodfacts.org/api/v0/product/${code}.json`
            );
            if (response.data.code) {
              tempData.push(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        }
        setHasProduct(true);
      } else {
        // products empty
        setHasProduct(false);
      }
      setData(tempData);
      setIsLoading(false);
    };

    fetchData();
  }, [productsBar]);

  // delete products (temp)
  const deleteProducts = async () => {
    setProductsBar([]);
    setFavoritesBar([]);
    setHasProduct(false);
    await AsyncStorage.removeItem("products");
    await AsyncStorage.removeItem("favorites");
  };

  return isLoading ? (
    <SplashScreen />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.greenYuka} />
      {hasProduct ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.code)}
          renderItem={({ item, index }) => {
            return (
              <LineProduct
                navigation={navigation}
                product={item.product}
                codeBar={item.code}
              />
            );
          }}
        ></FlatList>
      ) : (
        <Text>Pas de produits</Text>
      )}

      <TouchableOpacity
        style={{ height: 44 }}
        onPress={() => {
          navigation.navigate("Camera");
        }}
      >
        <Text>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ height: 44 }}
        onPress={() => {
          deleteProducts();
        }}
      >
        <Text>Delete products</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// *********************
//  styles
// *********************
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // marginTop: StatusBar.currentHeight,
  },
});
