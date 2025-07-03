import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CardProps } from "../../../types";
import { COLORS } from "../../constants/Colors";

const CardWithMutipleItems: React.FC<CardProps> = ({
  notTouchable = false,
  children,
  style,
  onPress,
}) => {
  // If children is an array, add a border to all except the last item
  const childrenArray = React.Children.toArray(children);

  return (
    <TouchableOpacity
      disabled={notTouchable}
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {childrenArray.map((child, idx) => (
        <View
          key={idx}
          style={[
            styles.item,
            idx !== childrenArray.length - 1 && styles.itemBorder,
          ]}
        >
          {child}
        </View>
      ))}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
    overflow: "hidden",
  },
  item: {
    padding: 12,
    backgroundColor: COLORS.white,
  },
  itemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderLight,
  },
});

export default CardWithMutipleItems;
