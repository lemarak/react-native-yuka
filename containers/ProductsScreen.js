import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import colors from "../assets/colors";
// Dimensions
const { height, width } = Dimensions.get("window");

export default function ProductsScreen({ productsBar, setProductsBar }) {
  const navigation = useNavigation();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasProduct, setHasProduct] = useState(false);

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
  }, [productsBar]);

  return isLoading ? (
    <ActivityIndicator size="large" color={colors.greenYuka} />
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
        onPress={() => {
          navigation.navigate("Camera", {});
        }}
      >
        <Text>Scan</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Camera", {});
        }}
      >
        <Text>Delete products</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
