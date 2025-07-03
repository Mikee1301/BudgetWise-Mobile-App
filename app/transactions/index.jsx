import dayjs from "dayjs";
import { useMemo, useState } from "react";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import tinycolor from "tinycolor2";

// Components
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Dropdown from "../../src/components/common/Dropdown";
import Spacer from "../../src/components/common/Spacer";
import { COLORS } from "../../src/constants/Colors";

// Data
import { transactions } from "../../src/mockData/transactions";
import { categories } from "../../src/mockData/categories";

const Transactions = () => {
  const router = useRouter();
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
  const groupByItems = [
    { label: "All", value: "All" },
    { label: "Income", value: "Income" },
    { label: "Expenses", value: "Expenses" },
    { label: "Transfer", value: "Transfer" },
  ];

  const currenySymbol = "₱";

  const { filteredTransactions, totalIncome, totalExpenses } = useMemo(() => {
    let filtered = transactions;

    // Category filter
    if (categoryFilter !== "All Categories") {
      filtered = filtered.filter(
        (transaction) => transaction.category === categoryFilter
      );
    }
    // Transaction Type filter
    if (activeGroupBy !== "All") {
      filtered = filtered.filter(
        (transaction) => transaction.type === activeGroupBy
      );
    }
    // Date filter
    if (dateFilter !== "Today") {
      const today = dayjs();
      filtered = filtered.filter((transaction) => {
        const txDate = dayjs(transaction.date);
        switch (dateFilter) {
          case "Yesterday":
            return txDate.isSame(today.subtract(1, "day"), "day");
          case "This Week":
            return txDate.isSame(today, "week");
          case "Last Week":
            return txDate.isSame(today.subtract(1, "week"), "week");
          case "This Month":
            return txDate.isSame(today, "month");
          case "Last Month":
            return txDate.isSame(today.subtract(1, "month"), "month");
          case "This Year":
            return txDate.isSame(today, "year");
          case "Last Year":
            return txDate.isSame(today.subtract(1, "year"), "year");
          default:
            return true;
        }
      });
    } else {
      // "Today"
      const today = dayjs();
      filtered = filtered.filter((transaction) =>
        dayjs(transaction.date).isSame(today, "day")
      );
    }

    // --- Calculate totals for the present month only ---
    const thisMonth = dayjs();
    const thisMonthTransactions = transactions.filter((transaction) =>
      dayjs(transaction.date).isSame(thisMonth, "month")
    );

    const totalIncome = thisMonthTransactions
      .filter((transaction) => transaction.type === "Income")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    const totalExpenses = thisMonthTransactions
      .filter((transaction) => transaction.type === "Expenses")
      .reduce((acc, transaction) => acc + transaction.amount, 0);

    return {
      filteredTransactions: filtered,
      totalIncome,
      totalExpenses,
    };
  }, [categoryFilter, activeGroupBy, dateFilter, transactions]);

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
            items={[
              "All Categories",
              ...categories.map((category) => category.name),
            ]}
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
        <Text style={[styles.transactionListHeaderText]}>
          This Month Summary
        </Text>
        {/* Card Summary Section */}
        <View style={styles.cardSummaryContainer}>
          <Card style={{ width: "45%" }}>
            <View style={styles.statContainer}>
              <View>
                <Text style={styles.cardSummaryLabel}>Total Income</Text>
                <Text
                  style={[styles.cardSummaryValue, { color: COLORS.success }]}
                >
                  {currenySymbol} {totalIncome.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={styles.statIcon}>
                <Icon name="ArrowUp" size={24} color={COLORS.success} />
              </View>
            </View>
          </Card>
          <Card style={{ width: "45%" }}>
            <View style={styles.statContainer}>
              <View>
                <Text style={styles.cardSummaryLabel}>Total Expenses</Text>
                <Text
                  style={[styles.cardSummaryValue, { color: COLORS.danger }]}
                >
                  {currenySymbol} {totalExpenses.toLocaleString("en-US")}
                </Text>
              </View>
              <View style={[styles.statIcon, { backgroundColor: "#FEE2E2" }]}>
                <Icon name="ArrowDown" size={24} color={COLORS.danger} />
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
                  router.push({
                    pathname: `/transactions/${item.id}`,
                    params: {
                      transaction: JSON.stringify(item),
                    }, // Pass account as a stringified JSON
                  });
                }}
              >
                <View style={styles.transactionItem}>
                  <View
                    style={[
                      styles.transactionIconContainer,
                      {
                        backgroundColor: tinycolor(item.iconColor)
                          .setAlpha(0.3)
                          .toRgbString(),
                      },
                    ]}
                  >
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
                        item.type === "Income"
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
    backgroundColor: COLORS.background,
  },
  filterSection: {
    backgroundColor: COLORS.background,
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
    borderColor: COLORS.gray200,
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: "center",
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.gray100,
  },
  selectedGroupByButton: {
    backgroundColor: COLORS.primary,
  },
  groupByButtonText: {
    color: COLORS.text,
  },
  selectedGroupByButtonText: {
    color: COLORS.textInverse,
  },
  transactionSection: {
    backgroundColor: COLORS.background,
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 10,
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
    color: COLORS.text,
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
    // paddingHorizontal: 15,
    marginBottom: 45,
    paddingVertical: 20,
  },
  transactionListHeader: {
    marginBottom: 10,
  },
  transactionListHeaderText: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text,
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
    borderRadius: 50,
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
    color: COLORS.text,
  },
  transactionCategory: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  transactionAmountContainer: {
    alignItems: "flex-end",
  },
  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
  incomeAmount: { color: COLORS.success },
  expenseAmount: { color: COLORS.danger },
  transactionDate: {
    fontSize: 11,
    color: COLORS.text,
    marginTop: 2,
  },
});
