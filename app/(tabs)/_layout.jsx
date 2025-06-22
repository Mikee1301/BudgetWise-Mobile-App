import { MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6366F1", // Example: active tab color
        tabBarInactiveTintColor: "#6B7280", // Example: inactive tab color
        tabBarStyle: {
          // backgroundColor: '#FFFFFF', // Your tab bar style
          // borderTopWidth: 0,
          height: 80,
          paddingBottom: 10, // Adjust this value for bottom padding
          paddingTop: 10,
        },
        // animation: "fade",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
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
            <MaterialIcons name="swap-horiz" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="create-transaction"
        options={{
          headerShown: true,
          title: "",
          headerTitle: "Add Transaction",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="add-circle-outline" size={30} color={color} />
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
            <MaterialIcons
              name="account-balance-wallet"
              size={size}
              color={color}
            />
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
            <MaterialIcons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
