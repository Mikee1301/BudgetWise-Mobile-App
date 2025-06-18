import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Briefcase,
  Coffee,
  CreditCard,
  DollarSign,
  PiggyBank,
  RefreshCcw,
  ShoppingCart,
  Zap,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/common/AppBar";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/Spacer";
import BalanceCard from "../../components/dashboard/BalanceCard";
import { QuickActionButton } from "../../components/dashboard/QuickActionsButtons";
import { TransactionItem } from "../../components/dashboard/TransactionItem";

const Dashboard = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const quickActions = [
    {
      id: 1,
      title: "Income",
      icon: <ArrowUpRight size={24} color="#10B981" strokeWidth={2} />,
      color: "#10B981",
    },
    {
      id: 2,
      title: "Expense",
      icon: <ArrowDownLeft size={24} color="#EF4444" strokeWidth={2} />,
      color: "#EF4444",
    },
    {
      id: 3,
      title: "Transfer",
      icon: <RefreshCcw size={24} color="#6366F1" strokeWidth={2} />,
      color: "#6366F1",
    },
  ];

  const accounts = [
    {
      id: 1,
      name: "Savings",
      balance: 1000000,
      icon: <PiggyBank size={24} color="#10B981" strokeWidth={2} />,
      accountNo: 1234567,
    },
    {
      id: 2,
      name: "BPI",
      balance: 12485,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
    },
    {
      id: 3,
      name: "BPI",
      balance: 12485,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
    },
  ];

  const transactions = [
    {
      id: 1,
      name: "Grocery Shopping",
      date: "2025-06-12",
      category: "Groceries",
      icon: <ShoppingCart size={24} color="#EF4444" strokeWidth={2} />, // Groceries icon
      amount: -1500.75, // Negative for expense
    },
    {
      id: 2,
      name: "Salary",
      date: "2025-06-10",
      category: "Income",
      icon: <DollarSign size={24} color="#10B981" strokeWidth={2} />, // Income icon
      amount: 50000.0, // Positive for income
    },
    {
      id: 3,
      name: "Electric Bill",
      date: "2025-06-08",
      category: "Utilities",
      icon: <Zap size={24} color="#F59E0B" strokeWidth={2} />, // Utilities icon
      amount: -3500.0, // Negative for expense
    },
    {
      id: 4,
      name: "Dining Out",
      date: "2025-06-07",
      category: "Food & Drinks",
      icon: <Coffee size={24} color="#EF4444" strokeWidth={2} />, // Food & Drinks icon
      amount: -1200.0, // Negative for expense
    },
    {
      id: 5,
      name: "Freelance Payment",
      date: "2025-06-05",
      category: "Income",
      icon: <Briefcase size={24} color="#10B981" strokeWidth={2} />, // Freelance Payment icon
      amount: 15000.0, // Positive for income
    },
    {
      id: 6,
      name: "Freelance Payment",
      date: "2025-06-05",
      category: "Income",
      icon: <Briefcase size={24} color="#10B981" strokeWidth={2} />, // Freelance Payment icon
      amount: 15000.0, // Positive for income
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
                const { icon, ...serializableAccountData } = account;
                // Navigate to the create-account screen and pass account data
                router.push({
                  pathname: "/create-account",
                  params: { account: JSON.stringify(serializableAccountData) }, // Pass account as a stringified JSON
                });
              }}
            >
              <View style={styles.accountContainer}>
                <View style={styles.accountInfoWrapper}>
                  <View style={styles.accountIcon}>{account.icon}</View>
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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("transactions")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.transactionsCard}>
            {transactions.slice(0, 5).map((transaction, index) => (
              <View key={transaction.id}>
                <TransactionItem transaction={transaction} />
                {index < transactions.length - 1 && (
                  <View style={styles.transactionSeparator} />
                )}
              </View>
            ))}
          </Card>
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
});
