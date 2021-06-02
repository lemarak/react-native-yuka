import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import colors from "../assets/colors";
import { FontAwesome } from "@expo/vector-icons";

import RangeBar from "./RangeBar";

const LineScore = ({ score, itemScore, value }) => {
  const [isExpand, setIsExpand] = useState(false);
  const displayScore = () => {
    let comment;
    let color;
    if (score > 4) {
      comment = "Mauvais";
      color = "red";
    } else if (score >= 2) {
      comment = "Moyen";
      color = "orange";
    } else if (score > 0) {
      comment = "Bon";
      color = colors.lightgreenYuka;
    } else {
      comment = "Excellent";
      color = colors.greenYuka;
    }
    return { comment: comment, colorScore: color };
  };

  const { comment, colorScore } = displayScore();

  const getInfos = () => {
    let nameIcon;
    let unity;
    if (itemScore === "Calories") {
      nameIcon = "fire";
      unity = "kCal";
    } else if (itemScore === "Graisses saturées") {
      nameIcon = "tint";
      unity = "g";
    } else if (itemScore === "Sel") {
      nameIcon = "bomb";
      unity = "g";
    } else if (itemScore === "Sucre") {
      nameIcon = "cubes";
      unity = "g";
    } else if (itemScore === "Fibres") {
      nameIcon = "pagelines";
      unity = "g";
    }
    return { nameIcon, unity };
  };

  return (
    <View style={styles.line}>
      <View style={styles.lineScore}>
        <FontAwesome
          style={styles.icon}
          name={getInfos().nameIcon}
          size={24}
          color="grey"
        />
        <View style={styles.detailRange}>
          <View style={styles.detailScore}>
            <View style={styles.comment}>
              <Text style={styles.textItem}>{itemScore}</Text>
              <Text style={styles.textComment}>{comment}</Text>
            </View>
            <TouchableOpacity
              style={styles.score}
              onPress={() => setIsExpand(!isExpand)}
            >
              <Text style={styles.scoreValue}>{`${value} ${
                getInfos().unity
              }`}</Text>
              <FontAwesome name="circle" size={20} color={colorScore} />

              <FontAwesome
                style={styles.chevron}
                name={isExpand ? "chevron-down" : "chevron-right"}
                size={18}
                color="grey"
              />
            </TouchableOpacity>
          </View>
          {isExpand && (
            <View>
              <RangeBar color={colorScore} />
            </View>
          )}
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
    alignItems: "flex-start",
    marginTop: 10,
    paddingHorizontal: 10,
  },
  icon: {
    flex: 0.1,
    paddingTop: 4,
  },
  detailRange: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderColor: "lightgrey",
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
  chevron: {
    marginLeft: 10,
  },
});
