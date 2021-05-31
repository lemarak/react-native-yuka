import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";

const Score = ({ score }) => {
  const displayScore = () => {
    const newScore = (score * -1 + 36) * 2 - 1;
    let comment;
    let color;
    if (newScore <= 30) {
      comment = "Mauvais";
      color = "red";
    } else if (newScore > 30 && newScore <= 60) {
      comment = "Moyen";
      color = "orange";
    } else {
      comment = "Excellent";
      color = "green";
    }
    return { newScore: newScore, commentScore: comment, colorScore: color };
  };

  const { newScore, commentScore, colorScore } = displayScore();

  return (
    <View style={styles.lineScore}>
      <FontAwesome name="circle" size={24} color={colorScore} />

      <View style={styles.detailScore}>
        <Text style={styles.score}>score {newScore}/100</Text>
        <Text>{commentScore}</Text>
      </View>
    </View>
  );
};

export default Score;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  lineScore: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  score: {
    fontWeight: "700",
    fontSize: 18,
  },
  detailScore: {
    marginLeft: 10,
  },
});
