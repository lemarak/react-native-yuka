import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SplashScreen from "../containers/SplashScreen";

import colors from "../assets/colors";
// Dimensions
const { height, width } = Dimensions.get("window");

// *********************
//  ProductsScreen
// *********************

export default function ProductsScreen({
  productsBar,
  setProductsBar,
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
      console.log("products :", productsBar);
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
  }, []);

  // delete products (temp)
  const deleteProducts = async () => {
    setProductsBar([]);
    setHasProduct(false);
    await AsyncStorage.removeItem("products");
  };

  return isLoading ? (
    // <ActivityIndicator size="large" color={colors.greenYuka} />
    <SplashScreen />
  ) : (
    <SafeAreaView style={styles.container}>
      {hasProduct ? (
        <FlatList
          data={data}
          keyExtractor={(item) => String(item.code)}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Product", { codeProduct: item.code });
                }}
              >
                <View style={styles.lineProduct}>
                  <Image
                    style={styles.imgProduct}
                    source={{
                      uri: item.product.image_url,
                    }}
                  />
                  <View style={styles.detailProduct}>
                    <Text style={styles.titleProduct}>
                      {item.product.product_name}
                    </Text>
                    <Text style={styles.brandProduct}>
                      {item.product.brands}
                    </Text>
                    <Text style={styles.brandProduct}>
                      score {item.product["nutriscore_grade"]}
                    </Text>
                    <Text>date</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      ) : (
        <Text>No data</Text>
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
    marginTop: StatusBar.currentHeight,
  },
  lineProduct: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
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
