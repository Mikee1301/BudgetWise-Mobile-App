import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Components
import Icon from "../../components/common/Icon";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/Spacer";
import AppBar from "../../src/components/dashboard/AppBar";
import BalanceCard from "../../src/components/dashboard/BalanceCard";
import QuickActionButton from "../../src/components/dashboard/QuickActionsButtons";

// Data
import { accounts } from "../../src/mockData/accounts";
import { transactions } from "../../src/mockData/transactions";

const Dashboard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const quickActions = [
    {
      id: 1,
      title: "Income",
      icon: "ArrowUp",
      color: "#10B981",
    },
    {
      id: 2,
      title: "Expense",
      icon: "ArrowDown",
      color: "#EF4444",
    },
    {
      id: 3,
      title: "Transfer",
      icon: "RefreshCcw",
      color: "#6366F1",
    },
  ];

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      {/* App Bar Section*/}
      <AppBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Balance Card Section*/}
        <BalanceCard />
        {/* Quick Actions Section*/}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <Spacer height={5} />
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionButton
                key={action.id}
                title={action.title}
                icon={action.icon}
                color={action.color}
                onPress={() => console.log(`${action.title} pressed`)}
              />
            ))}
          </View>
        </View>

        <Spacer height={20} />

        {/* My Accounts Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Accounts</Text>
            <TouchableOpacity onPress={() => navigation.navigate("accounts")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={20} />
          {accounts.slice(0, 2).map((account) => (
            <Card
              style={styles.accountCard}
              key={account.id}
              onPress={() => {
                // Navigate to the create-account screen and pass account data
                router.push({
                  pathname: `/accounts/${account.id}`,
                  params: { account: JSON.stringify(account) }, // Pass account as a stringified JSON
                });
              }}
            >
              <View style={styles.accountContainer}>
                <View style={styles.accountInfoWrapper}>
                  <View style={styles.accountIcon}>
                    <Icon
                      name={account.icon}
                      size={24}
                      color={account.iconColor}
                    />
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountInfoName}>{account.name}</Text>
                    <Text style={styles.accountInfoNo}>
                      **** {String(account.accountNo).slice(-4)}
                    </Text>
                  </View>
                </View>
                <Text style={styles.accountBalance}>
                  ₱{account.balance.toLocaleString("en-US")}
                </Text>
              </View>
            </Card>
          ))}
        </View>
        <Spacer height={20} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("transactions")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={5} />
          <FlatList
            data={transactions.slice(0, 5)}
            scrollEnabled={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Card
                style={[styles.transactionCard, { borderRadius: 0 }]}
                onPress={() => {
                  const { ...serializableTransactionData } = item;
                  // Navigate to the create-account screen and pass account data
                  router.push({
                    pathname: `/transactions/${item.id}`,
                    params: {
                      transaction: JSON.stringify(serializableTransactionData),
                    }, // Pass account as a stringified JSON
                  });
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
            ListFooterComponent={<Spacer height={80} />} // To avoid FAB overlap
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seeAllText: {
    color: "#6366F1",
    fontWeight: "600",
  },
  accountCard: {
    marginBottom: 10,
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  accountInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  accountInfo: {
    justifyContent: "center",
  },
  accountInfoName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  accountInfoNo: {
    fontSize: 14,
    fontWeight: "400",
    color: "#6B7280",
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "right",
  },
  transactionsCard: {
    padding: 0,
  },
  transactionSeparator: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 60,
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
    paddingHorizontal: 20,
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
