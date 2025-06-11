import { ArrowDownLeft, ArrowUpRight, RefreshCcw } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/common/AppBar";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/spacer";
import BalanceCard from "../../components/dashboard/BalanceCard";
import { QuickActionButton } from "../../components/dashboard/QuickActionsButtons";

const Dashboard = () => {
  const quickActions = [
    {
      id: 1,
      title: "Income",
      icon: <ArrowUpRight size={24} color="#10B981" strokeWidth={2} />, // Income icon
      color: "#10B981",
    },
    {
      id: 2,
      title: "Expense",
      icon: <ArrowDownLeft size={24} color="#EF4444" strokeWidth={2} />, // Expense icon
      color: "#EF4444",
    },
    {
      id: 3,
      title: "Transfer",
      icon: <RefreshCcw size={24} color="#6366F1" strokeWidth={2} />, // Transfer icon
      color: "#6366F1",
    },
  ];

  const accounts = [
    {
      id: 1,
      name: "Savings",
      balance: 99999,
    },
    {
      id: 2,
      name: "BPI",
      balance: 99999,
    },
  ];
  return (
    <SafeAreaView>
      <AppBar />
      <BalanceCard />
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <Spacer height={10} />
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
          <TouchableOpacity>
            <Text>See All</Text>
          </TouchableOpacity>
        </View>
        {accounts.map((account, index) => (
          <Card style={{ marginBottom: 10 }}>
            <View key={account.id} style={{ backgroundColor: "red" }}>
              <Text style={styles.accountTitle}>{account.name}</Text>
            </View>
          </Card>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
  accountTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
});
