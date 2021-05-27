import React, { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function CameraScreen({ setProducts, products }) {
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
    console.log("codeBar début", productBar);
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
          if (products && products.length > 0) {
            tempProducts = products;
          } else {
            tempProducts = [];
          }
          tempProducts.push(productBar);
          setProducts(tempProducts);
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
          {/* <Image
            source={{
              uri: "https://static.openfoodfacts.org/images/products/073/762/806/4502/front_en.6.400.jpg",
            }}
            style={styles.imgProduct}
          />
          <Text>Mon produit</Text> */}
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
    flex: 1,
    // width: "100%",
    // height: "50%",
  },
  halfScan: {
    flex: 0.5,
    width: "100%",
    height: "50%",
  },
  result: {
    flex: 1,
  },
  imgProduct: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
