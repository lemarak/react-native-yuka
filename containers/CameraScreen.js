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
import LineHeader from "../components/LineHeader";
import DetailProduct from "../components/DetailProduct";

import colors from "../assets/colors";

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
        if (response.data.status !== 0) {
          setProduct(response.data.product);

          // Save product in asyncStorage
          let tempProducts;
          if (
            productsBar &&
            productsBar.length > 0 &&
            productsBar.indexOf(productBar) === -1
          ) {
            tempProducts = [...productsBar];
            tempProducts.push(productBar);
            await AsyncStorage.setItem(
              "products",
              JSON.stringify(tempProducts)
            );
            setProductsBar(tempProducts);
          }
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [productBar]);

  const handleBarCodeScanned = async ({ type, data }) => {
    setProductBar(data);
    setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
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
        style={scanned ? styles.halfScan : StyleSheet.absoluteFillObject} //StyleSheet.absoluteFillObject
      />
      {product ? (
        <ScrollView style={styles.result}>
          <HeaderProduct product={product} />
          <LineHeader />
          {product.nutriscore_data ? (
            <DetailProduct product={product} />
          ) : (
            <View style={styles.noData}>
              <Text style={styles.textNoData}>
                Pas données sur les nutriments
              </Text>
            </View>
          )}
        </ScrollView>
      ) : scanned ? (
        <View style={styles.noProduct}>
          <Text style={styles.textNoProduct}>
            Ce produit n'est pas disponible dans notre base.
          </Text>
          <TouchableOpacity
            style={styles.newScan}
            onPress={() => setScanned(false)}
          >
            <Text style={styles.textNewScan}>Nouveau scan</Text>
          </TouchableOpacity>
        </View>
      ) : null}
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
    flex: 1,
  },
  halfScan: {
    flex: 1,
    width: "100%",
    // height: height / 2.5,
  },
  result: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  noProduct: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  textNoProduct: {
    fontSize: 20,
    color: colors.greenYuka,
  },
  newScan: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.lightgreenYuka,
    borderRadius: 10,
    padding: 10,
  },
  textNewScan: {
    color: "white",
  },
});
