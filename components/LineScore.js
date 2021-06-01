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

const LineScore = ({ score, itemScore, value }) => {
  const displayScore = () => {
    let comment;
    let color;
    if (score > 4) {
      comment = "Mauvais";
      color = "red";
    } else if (score >= 2) {
      comment = "Moyen";
      color = "orange";
    } else {
      comment = "Excellent";
      color = "green";
    }
    return { score: score, comment: comment, colorScore: color };
  };

  const { newScore, comment, colorScore } = displayScore();

  const getInfos = () => {
    let nameIcon;
    let unity;
    if ((itemScore = "Calories")) {
      nameIcon = "fire";
      unity = "kCal";
    }
    return { nameIcon, unity };
  };
  return (
    <View style={styles.lineScore}>
      <FontAwesome
        style={styles.icon}
        name={getInfos().nameIcon}
        size={24}
        color="grey"
      />
      <View style={styles.detailScore}>
        <View style={styles.comment}>
          <Text style={styles.textItem}>{itemScore}</Text>
          <Text style={styles.textComment}>{comment}</Text>
        </View>
        <View style={styles.score}>
          <Text style={styles.scoreValue}>{`${value} ${
            getInfos().unity
          }`}</Text>
          <FontAwesome name="circle" size={20} color={colorScore} />
        </View>
      </View>
    </View>
  );
};

export default LineScore;

// *********************
//  styles
// *********************

const styles = StyleSheet.create({
  lineScore: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 12,
  },
  detailScore: {
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comment: {
    flexDirection: "column",
  },
  textItem: {
    fontSize: 18,
    fontWeight: "700",
    color: "black",
  },
  textComment: {
    fontSize: 18,
    color: "grey",
  },
  score: {
    flexDirection: "row",
    alignItems: "center",
  },
  scoreValue: {
    fontSize: 18,
    marginRight: 12,
  },
});
