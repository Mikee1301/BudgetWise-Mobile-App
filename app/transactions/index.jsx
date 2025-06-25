import { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

// Components
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Dropdown from "../../src/components/common/Dropdown";
import Spacer from "../../src/components/common/Spacer";

// Data
import { transactions } from "../../src/mockData/transactions";

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
  const currenySymbol = "₱";

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
                  {currenySymbol} {totalIncome.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={styles.statIcon}>
                <Icon name="ArrowUp" size={24} color="#10B981" />
              </View>
            </View>
          </Card>
          <Card style={{ width: "45%" }}>
            <View style={styles.statContainer}>
              <View>
                <Text style={styles.cardSummaryLabel}>Total Expenses</Text>
                <Text style={[styles.cardSummaryValue, { color: "#EF4444" }]}>
                  {currenySymbol} {totalExpenses.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: "#FEE2E2" }]}>
                <Icon name="ArrowDown" size={24} color="#EF4444" />
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
            data={transactions}
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
                    <Icon name={item.icon} size={24} color={item.iconColor} />
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
            ListFooterComponent={<Spacer height={80} />}
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
    flex: 1,
    backgroundColor: "#FFFFFF",
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
    flex: 1,
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
    paddingHorizontal: 15,
    marginBottom: 20,
    paddingVertical: 10,
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
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
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
  incomeAmount: { color: "#10B981" },
  expenseAmount: { color: "#EF4444" },
  transactionDate: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
});
