import { StyleSheet, Text } from "react-native";
import { COLORS } from "../../constants/Colors";
import React from "react";

const Typo = ({
  color = COLORS.text,
  fontSize = 14,
  fontWeight = "400",
  style,
  children,
  ...props
}) => {
  return (
    <Text style={[{ color, fontSize, fontWeight }, style]} {...props}>
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({});
