import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// Dimensions
const { height, width } = Dimensions.get("window");

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
          data = response.data;
          const tempProduct = {
            code: productBar,
            name: data.product.product_name,
            imageUrl: data.product.image_url,
          };
          setProduct(tempProduct);

          // Save product in asyncStorage
          let tempProducts;
          if (
            productsBar &&
            productsBar.length > 0 &&
            productsBar.indexOf(productBar) === -1
          ) {
            tempProducts = productsBar;
          } else {
            tempProducts = [];
          }
          tempProducts.push(productBar);
          setProductsBar(tempProducts);
          await AsyncStorage.setItem("products", JSON.stringify(tempProducts));
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
        <View style={styles.result}>
          <TouchableOpacity onPress={() => setScanned(false)}>
            <Text>Tap to Scan Again</Text>
          </TouchableOpacity>

          <Image
            source={{
              uri: product.imageUrl,
            }}
            style={styles.imgProduct}
          />
          <Text>{product.name}</Text>
        </View>
      )}
    </View>
  );
}

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
  imgProduct: {
    width: width,
    height: height / 2,
    resizeMode: "contain",
  },
});
