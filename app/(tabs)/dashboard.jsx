import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  PiggyBank,
  RefreshCcw,
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

const Dashboard = () => {
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
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AppBar />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <BalanceCard />

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

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Accounts</Text>
            <TouchableOpacity onPress={() => console.log("See All pressed")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <Spacer height={10} />
          {accounts.map((account) => (
            <Card
              style={styles.accountCard}
              key={account.id}
              onPress={() =>
                console.log(`Card ID: ${account.id}, Name: ${account.name}`)
              }
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
});
