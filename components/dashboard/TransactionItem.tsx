import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: string;
  color: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

export function TransactionItem({
  transaction,
  onPress,
}: TransactionItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{transaction.icon}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{transaction.name}</Text>
        <Text style={styles.category}>{transaction.category}</Text>
      </View>

      <View style={styles.rightContent}>
        <Text
          style={[
            styles.amount,
            { color: transaction.amount > 0 ? "#10B981" : "#EF4444" },
          ]}
        >
          {transaction.amount > 0 ? "+" : ""}$
          {Math.abs(transaction.amount).toFixed(2)}
        </Text>
        <Text style={styles.date}>{transaction.date}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 2,
  },
  category: {
    fontSize: 14,
    color: "#6B7280",
  },
  rightContent: {
    alignItems: "flex-end",
  },
  amount: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
  },
});
