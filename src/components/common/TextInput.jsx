import { StyleSheet, TextInput as RNTextInput, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import React from "react";

const TextInput = ({
  keyboardType = "default",
  value,
  onChangeText,
  placeholder,
  style,
  multiline = false,
  numberOfLines = 2,
  ...props
}) => {
  return (
    <View style={styles.inputContainer}>
      <RNTextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textPlaceholder}
        style={[styles.input, style]}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginVertical: 8,
  },
  input: {
    backgroundColor: COLORS.gray100,
    color: COLORS.text,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.gray200,
    textAlignVertical: "top",
  },
});

export default TextInput;
