import React, { useState, useEffect } from "react";
import axios from "axios";
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
//  FavoritesScreen
// *********************

export default function FavoritesScreen({ favoritesBar, navigation }) {
  // states
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasFavorite, setHasFavorite] = useState(false);

  // useEffect
  useEffect(() => {
    const fetchData = async () => {
      // check if products not empty
      const tempData = [];

      if (favoritesBar) {
        for (let i = 0; i < favoritesBar.length; i++) {
          try {
            const code = favoritesBar[i];
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
        setHasFavorite(true);
      } else {
        // products empty
        setHasFavorite(false);
      }
      setData(tempData);
      setIsLoading(false);
    };

    fetchData();
  }, [favoritesBar]);

  return isLoading ? (
    <SplashScreen />
  ) : (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.greenYuka} />
      {hasFavorite ? (
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
        <Text>Pas de favoris</Text>
      )}
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
