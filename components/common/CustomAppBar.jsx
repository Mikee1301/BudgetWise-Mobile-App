import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "../common/Icon";

const CustomAppBar = ({ title = "AppBar", onBack, onDelete, ...props }) => {
  return (
    <View style={styles.appbarContainer}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Icon name="ArrowLeft" size={24} color="#111827" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {onDelete ? (
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Icon name="Trash" size={22} color="#EF4444" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 32 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  appbarContainer: {
    height: 48,
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
