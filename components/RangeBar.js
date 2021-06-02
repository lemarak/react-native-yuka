import React from "react";

import { StyleSheet, View } from "react-native";

import Slider from "@react-native-community/slider";
import { AntDesign } from "@expo/vector-icons";

import colors from "../assets/colors";

const RangeBar = ({ color }) => {
  const rangeColors = [
    colors.greenYuka,
    colors.lightgreenYuka,
    "orange",
    "red",
  ];
  const value = rangeColors.indexOf(color) + 0.5;
  return (
    <View style={styles.range}>
      <Slider
        style={styles.slider}
        disabled={false}
        minimumValue={0}
        maximumValue={4}
        value={value}
        thumbTintColor={color}
        minimumTrackTintColor="#eee"
        maximumTrackTintColor="#eee"
        // thumbImage={<AntDesign name="caretdown" size={24} color={color} />}
      />
      <View style={styles.bar}>
        <View
          style={[styles.part, { backgroundColor: colors.greenYuka }]}
        ></View>
        <View
          style={[styles.part, { backgroundColor: colors.lightgreenYuka }]}
        ></View>
        <View style={[styles.part, { backgroundColor: "orange" }]}></View>
        <View style={[styles.part, { backgroundColor: "red" }]}></View>
      </View>
    </View>
  );
};

export default RangeBar;

const styles = StyleSheet.create({
  range: {
    alignItems: "center",
    marginTop: 4,
    marginBottom: 8,
  },
  slider: {
    width: "90%",
    height: 20,
  },
  bar: {
    width: "90%",
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "center",
  },
  part: {
    flex: 0.22,
    marginRight: 2,

    height: 7,
  },
});
