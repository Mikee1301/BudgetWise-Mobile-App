import { Picker } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

const Dropdown = ({
  selectedValue,
  onValueChange,
  items,
  pickerStyle,
  containerStyle,
  enabled = true, // Optional: to disable the picker
}) => {
  return (
    <View style={[styles.defaultContainer, containerStyle]}>
      <Picker
        selectedValue={selectedValue}
        style={[styles.defaultPicker, pickerStyle]}
        onValueChange={onValueChange}
        enabled={enabled}
      >
        {items.map((item) => (
          <Picker.Item
            key={item.value || item}
            label={item.label || item}
            value={item.value || item}
          />
        ))}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  defaultContainer: {
    height: 40,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  defaultPicker: {
    width: "100%",
    backgroundColor: "#f9fafb",
  },
});

export default Dropdown;
