import { LinearGradient } from "expo-linear-gradient";
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff } from "lucide-react-native";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/colors";

interface BalanceCardProps {
  style?: object;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ style, ...props }) => {
  const [balanceVisible, setBalanceVisible] = useState<boolean>(true);

  const totalBalance: number = 12450.75; // Temporary balance
  const monthlyIncome: number = 4250.0; // Temporary monthly income
  const monthlyExpenses: number = 2180.25; // Temporary monthly expenses

  return (
    <LinearGradient
      colors={[COLORS.primary, COLORS.primaryLight]}
      style={[styles.balanceCard, style]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      {/* Balance Header and Eye functionality */}
      <View style={styles.balanceHeader}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <TouchableOpacity
          onPress={() => setBalanceVisible(!balanceVisible)}
          style={styles.eyeButton}
        >
          {balanceVisible ? (
            <Eye size={20} color={COLORS.white} strokeWidth={2} />
          ) : (
            <EyeOff size={20} color={COLORS.white} strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>
      {/* Balance Amount */}
      <Text style={styles.balanceAmount}>
        {balanceVisible
          ? `PHP ${totalBalance.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}`
          : "••••••"}
      </Text>

      <View style={styles.balanceStats}>
        {/* Income Section */}
        <View style={styles.statItem}>
          <View
            style={[
              styles.statIcon,
              { backgroundColor: COLORS.successVeryLight },
            ]}
          >
            <ArrowUpRight size={16} color={COLORS.success} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.statLabel}>Income</Text>
            <Text style={styles.statValue}>
              +PHP
              {monthlyIncome.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>

        {/* Expenses Section */}
        <View style={styles.statItem}>
          <View
            style={[
              styles.statIcon,
              { backgroundColor: COLORS.dangerVeryLight },
            ]}
          >
            <ArrowDownLeft size={16} color={COLORS.danger} strokeWidth={2} />
          </View>
          <View>
            <Text style={styles.statLabel}>Expenses</Text>
            <Text style={styles.statValue}>
              -PHP
              {monthlyExpenses.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

export default BalanceCard;

const styles = StyleSheet.create({
  balanceCard: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 24,
    padding: 24,
    minHeight: 180,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  eyeButton: {
    padding: 4,
  },

  balanceAmount: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.white,
    marginBottom: 20,
  },
  balanceStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: {
    marginRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  statIcon: {
    width: 22,
    height: 22,
    borderRadius: 16,
    backgroundColor: COLORS.successVeryLight, // Default, can be overridden
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 14,
    color: COLORS.white,
    fontWeight: "600",
    marginTop: 2,
  },
});
