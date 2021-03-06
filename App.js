import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import SplashScreen from "./containers/SplashScreen";
import ProductsScreen from "./containers/ProductsScreen";
import ProductScreen from "./containers/ProductScreen";
import CameraScreen from "./containers/CameraScreen";
import FavoritesScreen from "./containers/FavoritesScreen";

import colors from "./assets/colors";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsBar, setProductsBar] = useState([]);
  const [favoritesBar, setFavoritesBar] = useState([]);

  useEffect(() => {
    const getAsync = async () => {
      const productsAsync = await AsyncStorage.getItem("products");
      setProductsBar(JSON.parse(productsAsync));
      const favoritesAsync = await AsyncStorage.getItem("favorites");
      setFavoritesBar(JSON.parse(favoritesAsync));
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
                tabBarOptions={{
                  showIcon: true,
                  style: { backgroundColor: colors.lightgreenYuka },
                }}
              >
                <Tab.Screen
                  name="Home"
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: () => (
                      <MaterialCommunityIcons
                        name="fruit-watermelon"
                        size={24}
                        color="white"
                      />
                    ),
                  }}
                >
                  {() => (
                    <Stack.Navigator>
                      {/* Products */}
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
                            setFavoritesBar={setFavoritesBar}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
                {/* Favorites */}
                <Tab.Screen
                  name="Favorites"
                  options={{
                    tabBarLabel: "",
                    tabBarIcon: () => (
                      <Ionicons name={"star"} size={24} color="white" />
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
                        {(props) => (
                          <FavoritesScreen
                            {...props}
                            favoritesBar={favoritesBar}
                          />
                        )}
                      </Stack.Screen>
                    </Stack.Navigator>
                  )}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>
          {/* Camera */}
          <Stack.Screen
            name="Camera"
            options={{
              headerShown: true,
              title: "",
              headerStyle: {
                backgroundColor: colors.lightgreenYuka,
              },
              headerTintColor: "#fff",
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
          {/* Product */}
          <Stack.Screen
            name="Product"
            options={{
              headerShown: false,
            }}
          >
            {(props) => (
              <ProductScreen
                {...props}
                favoritesBar={favoritesBar}
                setFavoritesBar={setFavoritesBar}
              />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
