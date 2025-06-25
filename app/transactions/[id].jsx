import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import tinycolor from "tinycolor2";

// Components
import CustomAppBar from "../../src/components/common/CustomAppBar";
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";

const TransactionDetails = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const transaction = JSON.parse(params.transaction);
  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Transaction Details"
        onBack={() => navigation.goBack()}
      />
      <View style={styles.transationDetailsHeader}>
        <View
          style={[
            {
              backgroundColor: tinycolor(transaction.iconColor)
                .setAlpha(0.3)
                .toRgbString(),
            },
            styles.transactionIcon,
          ]}
        >
          <Icon
            name={transaction.icon}
            size={30}
            color={transaction.iconColor}
          />
        </View>
        <Text style={styles.transactionAmount}>{transaction.amount}</Text>
        <Text style={styles.transactionCategory}>{transaction.category}</Text>
      </View>
      <View style={styles.transactionDetails}>
        <Card notTouchable={true}>
          <View style={styles.transactionDetailsItem}>
            <View style={styles.transactionDetailsIcon}>
              <Icon name="Calendar" size={20} color="#666" />
              <Text style={styles.transactionDetailsIconText}>Date</Text>
            </View>
            <Text>{transaction.date}</Text>
          </View>
          <View style={styles.transactionDetailsItem}>
            <View style={styles.transactionDetailsIcon}>
              <Icon name="Wallet" size={20} color="#666" />
              <Text style={styles.transactionDetailsIconText}>Account</Text>
            </View>
            <Text>{transaction.account}</Text>
          </View>
          <View style={styles.transactionDetailsItem}>
            <View style={styles.transactionDetailsIcon}>
              <Icon name="Rows3" size={20} color="#666" />
              <Text style={styles.transactionDetailsIconText}>
                Transaction ID
              </Text>
            </View>
            <Text>
              <Text>{transaction.id}</Text>
            </Text>
          </View>
          <View style={styles.transactionNotes}>
            <View style={styles.transactionNotesHeader}>
              <Text>Notes</Text>
            </View>
            <Spacer height={10} />
            <Text>
              <Text>
                {transaction.notes || "No notes for this transaction."}
              </Text>
            </Text>
          </View>
        </Card>
      </View>
      <Spacer height={20} />
      <View style={styles.transactionActions}>
        <Pressable
          style={({ pressed }) => [
            styles.editTransactionButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => {
            router.push({
              pathname: `/transactions/edit/${transaction.id}`,
              params: {
                transaction: JSON.stringify(transaction),
              },
            });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="Pencil" size={20} color="#fff" />
            <Text style={[styles.editTransactionButtonText, { marginLeft: 8 }]}>
              Edit Transaction
            </Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.editTransactionButton,
            pressed && { opacity: 0.7 }, // Add visual feedback on press
            {
              backgroundColor: tinycolor("#EF4444").setAlpha(0.3).toRgbString(),
            },
          ]}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="Trash" size={20} color="#EF4444" />
            <Text
              style={[
                styles.editTransactionButtonText,
                { color: "#EF4444", marginLeft: 8 },
              ]}
            >
              Delete Transaction
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  transactionIcon: {
    height: 70,
    width: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  transationDetailsHeader: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },
  transactionAmount: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  transactionCategory: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  transactionDetails: {
    width: "100%",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  transactionDetailsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  transactionDetailsIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: 100,
  },
  transactionDetailsIconText: {
    marginLeft: 8,
    color: "#666",
    fontSize: 14,
  },
  transactionActions: {
    height: "auto",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  editTransactionButton: {
    backgroundColor: "#6366F1",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "90%",
    alignItems: "center",
  },
  editTransactionButtonText: {
    color: "#fff",
    fontSize: 16,
    // fontWeight: "bold",
  },
});
