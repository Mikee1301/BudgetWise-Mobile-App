import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../common/Icon";
import { COLORS } from "../../constants/Colors";

const CustomAppBar = ({
  title = "AppBar",
  onBack,
  onDelete,
  onEdit,
  ...props
}) => {
  return (
    <View style={styles.appbarContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Icon name="ArrowLeft" size={24} color={COLORS.text} />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {onEdit ? (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="Pencil" size={22} color="#6366F1" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} />
      )}
      {onDelete ? (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="Trash" size={22} color={COLORS.danger} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appbarContainer: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    elevation: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
});

export default CustomAppBar;
