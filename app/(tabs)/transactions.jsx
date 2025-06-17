import {
  ArrowDown,
  ArrowUp,
  Briefcase, // Added for new transaction
  Coffee,
  DollarSign, // Used for Income/Investments
  Gift, // Added for new transaction
  Home, // Added for new transaction
  Plane, // Added for new transaction
  PlusCircle, // Added for new transaction (Transfer)
  ShoppingCart,
  Smile, // Added for new transaction
  Train, // Added for new transaction
  Zap,
} from "lucide-react-native";
import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

import Card from "../../components/common/Card";
import Dropdown from "../../components/common/Dropdown";
import Spacer from "../../components/common/Spacer";

const Transactions = () => {
  const [dateFilter, setDateFilter] = useState("Today");
  const [activeGroupBy, setActiveGroupBy] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const dateFilterItems = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "This Year",
    "Last Year",
  ];
  const categoryFilterItems = [
    "All Categories",
    "Food & Drink",
    "Groceries",
    "Transportation",
    "Income",
    "Shopping",
    "Bills",
    "Entertainment",
  ];

  const groupByItems = [
    { label: "All", value: "All" },
    { label: "Income", value: "Income" },
    { label: "Expenses", value: "Expenses" },
    { label: "Transfer", value: "Transfer" },
  ];

  const totalIncome = 80000;
  const totalExpenses = 20000;

  // Sample transactions data (replace with your actual data source)
  const transactionsData = [
    {
      id: "1",
      name: "Grocery Shopping",
      date: "2024-07-28",
      category: "Groceries",
      icon: <ShoppingCart size={24} color="#EF4444" strokeWidth={2} />,
      amount: -150.75,
      type: "expense",
    },
    {
      id: "2",
      name: "Salary",
      date: "2024-07-27",
      category: "Income",
      icon: <DollarSign size={24} color="#10B981" strokeWidth={2} />,
      amount: 5000.0,
      type: "income",
    },
    {
      id: "3",
      name: "Electric Bill",
      date: "2024-07-26",
      category: "Utilities",
      icon: <Zap size={24} color="#F59E0B" strokeWidth={2} />,
      amount: -75.0,
      type: "expense",
    },
    {
      id: "4",
      name: "Coffee Shop",
      date: "2024-07-25",
      category: "Food & Drink",
      icon: <Coffee size={24} color="#EF4444" strokeWidth={2} />,
      amount: -5.5,
      type: "expense",
    },
    {
      id: "5",
      name: "Freelance Project",
      date: "2024-07-24",
      category: "Income",
      icon: <Briefcase size={24} color="#10B981" strokeWidth={2} />,
      amount: 750.0,
      type: "income",
    },
    {
      id: "6",
      name: "Train Ticket",
      date: "2024-07-23",
      category: "Transportation",
      icon: <Train size={24} color="#F59E0B" strokeWidth={2} />,
      amount: -25.0,
      type: "expense",
    },
    {
      id: "7",
      name: "Birthday Gift",
      date: "2024-07-22",
      category: "Gifts",
      icon: <Gift size={24} color="#EF4444" strokeWidth={2} />,
      amount: -50.0,
      type: "expense",
    },
    {
      id: "8",
      name: "Stock Dividend",
      date: "2024-07-21",
      category: "Investments",
      icon: <DollarSign size={24} color="#10B981" strokeWidth={2} />,
      amount: 120.0,
      type: "income",
    },
    {
      id: "9",
      name: "Rent Payment",
      date: "2024-07-20",
      category: "Housing",
      icon: <Home size={24} color="#F59E0B" strokeWidth={2} />,
      amount: -800.0,
      type: "expense",
    },
    {
      id: "10",
      name: "Movie Tickets",
      date: "2024-07-19",
      category: "Entertainment",
      icon: <Smile size={24} color="#EF4444" strokeWidth={2} />,
      amount: -30.0,
      type: "expense",
    },
    {
      id: "11",
      name: "Transfer to Savings",
      date: "2024-07-18",
      category: "Transfer",
      icon: <PlusCircle size={24} color="#6366F1" strokeWidth={2} />,
      amount: -200.0, // Amount moved out of this account
      type: "transfer", // Added 'transfer' type
    },
    {
      id: "12",
      name: "Travel Fund Deposit",
      date: "2024-07-18",
      category: "Transfer",
      icon: <Plane size={24} color="#6366F1" strokeWidth={2} />,
      amount: 200.0, // Amount moved into this account
      type: "transfer", // Added 'transfer' type
    },
  ];

  // TODO: Filter transactionsData based on dateFilter, categoryFilter, and activeGroupBy
  const filteredTransactions = transactionsData;

  return (
    <View style={styles.mainContainer}>
      {/* Filters Section */}
      <View style={styles.filterSection}>
        <Spacer height={5} />
        {/* Filter Section */}
        <View style={styles.filterContainer}>
          <Dropdown
            selectedValue={dateFilter}
            onValueChange={(itemValue) => setDateFilter(itemValue)}
            items={dateFilterItems}
            containerStyle={styles.pickerContainer}
          />
          <Dropdown
            selectedValue={categoryFilter}
            onValueChange={(itemValue) => setCategoryFilter(itemValue)}
            items={categoryFilterItems}
            containerStyle={styles.pickerContainer}
          />
        </View>

        {/* Group by Section */}
        <View style={styles.groupByContainer}>
          {groupByItems.map((item) => (
            <Pressable
              key={item.value}
              onPress={() => setActiveGroupBy(item.value)}
              style={[
                styles.groupByButton,
                activeGroupBy === item.value && styles.selectedGroupByButton,
              ]}
            >
              <Text
                style={[
                  styles.groupByButtonText,
                  activeGroupBy === item.value &&
                    styles.selectedGroupByButtonText,
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={styles.transactionSection}>
        {/* Card Summary Section */}
        <View style={styles.cardSummaryContainer}>
          <Card style={{ width: "45%" }}>
            <View style={styles.statContainer}>
              <View>
                <Text style={styles.cardSummaryLabel}>Total Income</Text>
                <Text style={[styles.cardSummaryValue, { color: "#10B981" }]}>
                  ₱ {totalIncome.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={styles.statIcon}>
                <ArrowUp size={16} color="#10B981" strokeWidth={2} />
              </View>
            </View>
          </Card>
          <Card style={{ width: "45%" }}>
            <View style={styles.statContainer}>
              <View>
                <Text style={styles.cardSummaryLabel}>Total Expenses</Text>
                <Text style={[styles.cardSummaryValue, { color: "#EF4444" }]}>
                  ₱ {totalExpenses.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: "#FEE2E2" }]}>
                <ArrowDown size={16} color="#EF4444" strokeWidth={2} />
              </View>
            </View>
          </Card>
        </View>

        {/* Transactions List Section */}

        <View style={styles.transactionListContainer}>
          <View style={styles.transactionListHeader}>
            <Text style={styles.transactionListHeaderText}>{dateFilter}</Text>
          </View>
          <FlatList
            data={filteredTransactions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={[styles.transactionCard, { borderRadius: 0 }]}
                onPress={() => {
                  console.log(item);
                }}
              >
                <View style={styles.transactionItem}>
                  <View style={styles.transactionIconContainer}>
                    {item.icon}
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionName}>{item.name}</Text>
                    <Text style={styles.transactionCategory}>
                      {item.category}
                    </Text>
                  </View>
                  <View style={styles.transactionAmountContainer}>
                    <Text
                      style={[
                        styles.transactionAmount,
                        item.type === "income"
                          ? styles.incomeAmount
                          : styles.expenseAmount,
                      ]}
                    >
                      {item.type === "income" ? "+" : "-"}₱
                      {Math.abs(item.amount).toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                  </View>
                </View>
              </Card>
            )}
            ListHeaderComponent={<Spacer height={5} />}
            ListFooterComponent={<Spacer height={80} />} // To avoid FAB overlap
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, // Make the main container take full height
    backgroundColor: "#FFFFFF", // Or your desired overall background
  },
  filterSection: {
    backgroundColor: "#FFFFFF",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 60,
  },
  pickerContainer: {
    height: 40,
    width: 185,
    borderColor: "#e0e0e0",
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  groupByContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: 50,
  },
  groupByButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 120,
    backgroundColor: "#f9fafb",
  },
  selectedGroupByButton: {
    backgroundColor: "#6366f1",
  },
  groupByButtonText: {
    color: "black",
  },
  selectedGroupByButtonText: {
    color: "white",
  },
  transactionSection: {
    backgroundColor: "#F9FAFB",
    flex: 1, // Allow this section to grow and enable FlatList scrolling
    // backgroundColor: "red",
  },
  cardSummaryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    marginVertical: 10,
  },
  statContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 2,
  },
  cardSummaryLabel: {
    fontSize: 13,
    // fontWeight: "600",
    color: "#111827",
  },
  cardSummaryValue: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
  statIcon: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "#DCFCE7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionListContainer: {
    // flex: 1, // Ensure this container also expands
    paddingHorizontal: 15,
    marginBottom: 20,
    paddingVertical: 10,
    // backgroundColor: "red",
  },
  transactionListHeader: {
    marginBottom: 10,
  },
  transactionListHeaderText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#374151",
  },
  transactionCard: {
    // marginBottom: 10,
    // paddingVertical: 12,
    paddingHorizontal: 10,
  },
  transactionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6", // Light gray background for icon
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1, // Allows text to take available space and wrap if needed
    marginRight: 10,
  },
  transactionName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1F2937",
  },
  transactionCategory: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  transactionAmountContainer: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  incomeAmount: { color: "#10B981" }, // Green for income
  expenseAmount: { color: "#EF4444" }, // Red for expenses
  transactionDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
