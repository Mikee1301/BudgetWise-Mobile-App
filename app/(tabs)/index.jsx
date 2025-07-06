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
import tinycolor from "tinycolor2";

// Components
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";
import AppBar from "../../src/components/dashboard/AppBar";
import BalanceCard from "../../src/components/dashboard/BalanceCard";
import CardWithMutipleItems from "../../src/components/common/CardWithMutipleItems";
import QuickActionButton from "../../src/components/dashboard/QuickActionsButtons";

// Data
import { accounts } from "../../src/mockData/accounts";
import { transactions } from "../../src/mockData/transactions";

// COLORS constant
import { COLORS } from "../../src/constants/Colors";

const Dashboard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const quickActions = [
    {
      id: 1,
      title: "Income",
      icon: "ArrowUp",
      color: COLORS.success,
    },
    {
      id: 2,
      title: "Expense",
      icon: "ArrowDown",
      color: COLORS.danger,
    },
    {
      id: 3,
      title: "Transfer",
      icon: "RefreshCcw",
      color: COLORS.primary,
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
        {/* <View style={styles.section}>
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
        </View> */}

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
                router.push({
                  pathname: `/accounts/${account.id}`,
                  params: { account: JSON.stringify(account) },
                });
              }}
            >
              <View style={styles.accountContainer}>
                <View style={styles.accountInfoWrapper}>
                  <View
                    style={[
                      styles.accountIcon,
                      {
                        backgroundColor: tinycolor(account.iconColor)
                          .setAlpha(0.3)
                          .toRgbString(),
                      },
                    ]}
                  >
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
          <CardWithMutipleItems>
            {transactions.slice(0, 5).map((item) => (
              <TouchableOpacity
                key={item.id}
                onPress={() => {
                  const { ...serializableTransactionData } = item;
                  router.push({
                    pathname: `/transactions/${item.id}`,
                    params: {
                      transaction: JSON.stringify(serializableTransactionData),
                    },
                  });
                }}
                activeOpacity={0.7}
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
                      {item.type === "Income" ? "+" : "-"}₱
                      {Math.abs(item.amount).toLocaleString("en-US")}
                    </Text>
                    <Text style={styles.transactionDate}>{item.date}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </CardWithMutipleItems>
          <Spacer height={80} />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/transactions/create")}
      >
        <Icon name="Plus" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    color: COLORS.text,
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
    color: COLORS.primary,
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
    color: COLORS.text,
  },
  accountInfoNo: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textLight,
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "right",
  },
  transactionsCard: {
    padding: 0,
  },
  transactionSeparator: {
    height: 1,
    backgroundColor: COLORS.backgroundMuted,
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
    color: COLORS.textSecondary,
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
    backgroundColor: COLORS.text,
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
    color: COLORS.textMuted,
    marginTop: 2,
  },
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
});
