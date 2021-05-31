import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import HeaderProduct from "../components/HeaderProduct";

// Dimensions
const { height, width } = Dimensions.get("window");

// *********************
//  CameraScreen
// *********************
export default function CameraScreen({ setProductsBar, productsBar }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [productBar, setProductBar] = useState();
  const [product, setProduct] = useState(null);

  //   Permission camera
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  //   Get product from API OpenFoodFacts
  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(
          `https://fr.openfoodfacts.org/api/v0/product/${productBar}.json`
        );
        // Load Product

        if (response.data.code) {
          setProduct(response.data.product);

          // Save product in asyncStorage
          let tempProducts;
          if (
            productsBar &&
            productsBar.length > 0 &&
            productsBar.indexOf(productBar) === -1
          ) {
            tempProducts = [...productsBar];
          } else {
            tempProducts = [];
          }
          tempProducts.push(productBar);

          await AsyncStorage.setItem("products", JSON.stringify(tempProducts));
          setProductsBar(tempProducts);
        } else {
          setScanned(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productBar, scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log("codeBar", data);
    setProductBar(data);
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={scanned ? styles.halfScan : styles.fullScan} //StyleSheet.absoluteFillObject
      />
      {product && (
        <ScrollView style={styles.result}>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>

          <HeaderProduct product={product} />
        </ScrollView>
      )}
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

  fullScan: {
    width: width,
    height: height,
  },
  halfScan: {
    width: width,
    height: height / 2.5,
  },
  result: {
    flex: 1,
  },
});
