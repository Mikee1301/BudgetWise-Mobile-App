import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../constants/Colors";

const Button = ({
  title,
  onPress,
  style,
  textStyle,
  disabled = false,
  loading = false,
  ...props
}) => (
  <TouchableOpacity
    style={[styles.button, disabled ? styles.disabled : {}, style]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={disabled || loading}
    {...props}
  >
    {loading ? (
      <ActivityIndicator color={COLORS.textInverse} />
    ) : (
      <Text style={[styles.text, textStyle]}>{title}</Text>
    )}
  </TouchableOpacity>
);

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "400",
  },
  disabled: {
    backgroundColor: COLORS.gray200,
  },
});
