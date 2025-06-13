import { Bell } from "lucide-react-native";
import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

interface AppBarProps {
  greetings?: string;
  name?: string;
  style?: ViewStyle;
}

const AppBar: React.FC<AppBarProps> = ({
  greetings = "Hello,",
  name = "Michael",
  style,
}) => {
  return (
    <View style={[styles.header, style]}>
      <View>
        <Text style={styles.greeting}>{greetings}</Text>
        <Text style={styles.userName}>{name}</Text>
      </View>
      <TouchableOpacity style={styles.notificationButton}>
        <Bell size={24} color="#374151" strokeWidth={2} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  } as ViewStyle,
  greeting: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "400",
  } as TextStyle,
  userName: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "700",
    marginTop: 2,
  } as TextStyle,
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  } as ViewStyle,
});

export default AppBar;
