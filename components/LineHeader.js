import React from "react";
import { StyleSheet, View } from "react-native";

const LineHeader = () => {
  return <View style={styles.line}></View>;
};

export default LineHeader;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  line: {
    height: 5,
    width: "100%",
    marginTop: 10,
    backgroundColor: "lightgrey",
  },
});
