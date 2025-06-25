import { StyleSheet, Text, View } from "react-native";
import React from "react";
import tinycolor from "tinycolor2";
import Icon from "../common/Icon";
const IconInsideCicle = ({
  iconName,
  circleColor = "#F3F4F6",
  iconSize = 24,
  circleSize,
  iconColor = "black",
}) => {
  const computedCircleSize =
    circleSize !== undefined ? circleSize : iconSize + 20;
  return (
    <View
      style={[
        styles.accountIcon,
        {
          width: computedCircleSize,
          height: computedCircleSize,
          backgroundColor: tinycolor(iconColor).setAlpha(0.3).toRgbString(),
          borderRadius: computedCircleSize / 2,
        },
      ]}
    >
      <Icon name={iconName} size={iconSize} color={iconColor} />
    </View>
  );
};

export default IconInsideCicle;

const styles = StyleSheet.create({
  accountIcon: {
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
});
