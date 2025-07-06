import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../src/components/common/Icon";
import { COLORS } from "../../src/constants/Colors";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          height: 80,
          paddingBottom: 10,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <Icon name="LayoutDashboard" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          headerShown: true,
          title: "Transactions",
          headerTitle: "Transactions",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Icon name="ArrowRightLeft" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="accounts"
        options={{
          headerShown: true,
          title: "Accounts",
          headerTitle: "Accounts",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Icon name="Wallet" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="budgets"
        options={{
          headerShown: true,
          title: "Budgets",
          headerTitle: "Budget Goals",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Icon name="Goal" color={color} size={size} />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 16 }}>
              <Icon name="Plus" color={COLORS.primary} size={24} />
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          title: "Profile",
          headerTitle: "Profile",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <Icon name="User" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
