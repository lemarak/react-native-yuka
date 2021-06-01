import React from "react";

import { StyleSheet, View } from "react-native";

import colors from "../assets/colors";

const RangeBar = () => {
  return (
    <View style={styles.bar}>
      <View style={[styles.part, { backgroundColor: colors.greenYuka }]}></View>
      <View
        style={[styles.part, { backgroundColor: colors.lightgreenYuka }]}
      ></View>
      <View style={[styles.part, { backgroundColor: "orange" }]}></View>
      <View style={[styles.part, { backgroundColor: "red" }]}></View>
    </View>
  );
};

export default RangeBar;

const styles = StyleSheet.create({
  bar: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "center",
  },
  part: {
    flex: 0.18,
    marginRight: 2,

    height: 7,
  },
});
