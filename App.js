import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons } from "@expo/vector-icons";

import SplashScreen from "./containers/SplashScreen";
import ProductsScreen from "./containers/ProductsScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

import colors from "./assets/colors";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsBar, setProductsBar] = useState([]);

  useEffect(() => {
    const getAsync = async () => {
      const productsAsync = await AsyncStorage.getItem("products");
      setProductsBar(JSON.parse(productsAsync));
      console.log("products app.js :", JSON.parse(productsAsync));
      // timing
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsLoading(false);
    };

    getAsync();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        // ************
        // SPLASH SCREEN
        // ************
        <SplashScreen />
      ) : (
        // ************
        // NAVIGATION
        // ************
        <Stack.Navigator>
          <Stack.Screen name="Tab" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                tabBarPosition="bottom"
                tabBarOptions={{
                  showIcon: true,
                  style: { backgroundColor: colors.greenYuka },
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "Produits",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons name={"ios-home"} size={size} color={"white"} />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Products"
                        options={{
                          headerShown: false,
                        }}
                      >
                        {(props) => (
                          <ProductsScreen
                            {...props}
                            productsBar={productsBar}
                            setProductsBar={setProductsBar}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Camera"
                        options={{
                          headerShown: true,
                          title: "",
                        }}
                      >
                        {(props) => (
                          <CameraScreen
                            {...props}
                            productsBar={productsBar}
                            setProductsBar={setProductsBar}
                          />
                        )}
                      </Stack.Screen>

                      <Stack.Screen
                        name="Product"
                        options={{
                          headerShown: false,
                        }}
                      >
                        {(props) => <ProductScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                <Tab.Screen
                  name="Favorites"
                  options={{
                    tabBarLabel: "Favoris",
                    tabBarIcon: ({ color, size }) => (
                      <Ionicons
                        name={"ios-options"}
                        size={size}
                        color={color}
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      <Stack.Screen
                        name="Favorites"
                        options={{
                          headerShown: false,
                        }}
                      >
                        {(props) => <FavoritesScreen {...props} />}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
