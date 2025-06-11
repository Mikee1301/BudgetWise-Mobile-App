import { Bell } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AppBar = ({ greetings = "Hello,", name = "Michael", style }) => {
  return (
    <View style={styles.header}>
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
  },
  greeting: {
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "400",
  },
  userName: {
    fontSize: 18,
    color: "#111827",
    fontWeight: "700",
    marginTop: 2,
  },
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
  },
});

export default AppBar;
