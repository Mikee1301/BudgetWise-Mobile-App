import React, { ReactNode } from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

interface CardProps {
  notTouchable: boolean;
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
}

const Card: React.FC<CardProps> = ({
  notTouchable = false,
  children,
  style,
  onPress,
}) => {
  return (
    <TouchableOpacity
      disabled={notTouchable}
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default Card;
