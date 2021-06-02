import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import colors from "../assets/colors";

const Score = ({ score, screen }) => {
  const displayScore = () => {
    let comment;
    let color;
    let newScore;
    if (score) {
      newScore = (score * -1 + 36) * 2 - 1;
      if (score > 0) {
        newScore = parseInt(newScore / 2);
      }
      if (newScore <= 30) {
        comment = "Mauvais";
        color = "red";
      } else if (newScore > 30 && newScore <= 50) {
        comment = "Moyen";
        color = "orange";
      } else if (newScore > 50 && newScore <= 80) {
        comment = "Bon";
        color = colors.lightgreenYuka;
      } else {
        comment = "Excellent";
        color = colors.greenYuka;
      }
    } else {
      newScore = null;
      comment = "Pas de note";
      color = "grey";
    }
    return { newScore: newScore, commentScore: comment, colorScore: color };
  };

  const { newScore, commentScore, colorScore } = displayScore();

  return (
    <View style={styles.lineScore}>
      <FontAwesome name="circle" size={20} color={colorScore} />

      <View style={styles.detailScore}>
        {screen === "oneProduct" ? (
          <View>
            {newScore && <Text style={styles.score}>score {newScore}/100</Text>}
            <Text>{commentScore}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.comment}>{commentScore}</Text>
          </View>
        )}
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
  comment: {
    color: "grey",
    fontSize: 18,
  },
});
