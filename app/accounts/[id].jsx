import { Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

// Component
import CustomAppBar from "../../src/components/common/CustomAppBar";
import IconInsideCicle from "../../src/components/common/IconInsideCicle";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";
import Icon from "../../src/components/common/Icon";
import tinycolor from "tinycolor2";

const AccountInfo = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const account = params.account ? JSON.parse(params.account) : {};
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomAppBar title="Account Info" onBack={() => navigation.goBack()} />
      {/* <View style={styles.summaryWrapper}></View> */}

      <View style={styles.iconWrapper}>
        <IconInsideCicle
          iconName={account.icon}
          iconSize={30}
          iconColor={account.iconColor}
        />
      </View>
      <Text style={styles.accountName}>{account.name}</Text>
      <Text style={styles.accountNumber}>*******</Text>

      <Spacer height={10} />
      {/* Account Information */}
      <Text style={styles.sectionTitle}>Account Information</Text>
      <Spacer height={10} />
      <Card notTouchable={true} style={styles.accountInfoWrapper}>
        <View style={styles.accountInfoItem}>
          <Text>Account Type</Text>
          <Text>{account.accountType}</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text>Balance</Text>
          <Text>₱ {account.balance.toLocaleString("en-US")}</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text>Created Date</Text>
          <Text>{account.createdAt}</Text>
        </View>
        <View style={styles.accountInfoItem}>
          <Text>Updated Date</Text>
          <Text>{account.updatedAt}</Text>
        </View>
      </Card>

      {/* Account Income and Expenses Summary This Month*/}
      <Text style={styles.sectionTitle}>This Month</Text>
      <Spacer height={10} />
      <Card notTouchable={true} style={styles.accountSummaryWrapper}>
        <View style={styles.accountSummaryItem}>
          <Text style={[styles.accountSummaryAmount, { color: "#22C55E" }]}>
            ₱ 1,0000
          </Text>
          <Text style={styles.accountSummaryLabel}>Total Income</Text>
        </View>
        <View style={styles.accountSummaryItem}>
          <Text style={[styles.accountSummaryAmount, { color: "#EF4444" }]}>
            ₱ 1,0000
          </Text>
          <Text style={styles.accountSummaryLabel}>Total Expenses</Text>
        </View>
        <View></View>
      </Card>
      {/* <Text style={styles.sectionTitle}>Recent Transaction</Text>
      <Card>
        <Text>Comming Soon</Text>
      </Card> */}

      <View style={styles.transactionActions}>
        <Pressable
          style={({ pressed }) => [
            styles.editTransactionButton,
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => {
            router.push({
              pathname: `/accounts/create`,
              params: {
                account: JSON.stringify(account),
              },
            });
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="Pencil" size={20} color="#fff" />
            <Text style={[styles.editTransactionButtonText, { marginLeft: 8 }]}>
              Edit Account
            </Text>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  iconWrapper: {
    alignItems: "center",
    marginTop: 32,
  },
  accountName: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
    paddingRight: 15,
    textAlign: "center",
  },
  accountNumber: {
    fontSize: 14,
    marginTop: 5,
    paddingRight: 15,
    textAlign: "center",
    color: "#666",
  },
  accountInfoWrapper: {
    width: "90%",
    height: "auto",
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    textAlign: "start",
    width: "90%",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
  },
  accountInfoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 10,
  },
  accountSummaryWrapper: {
    width: "90%",
    padding: 25,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountSummaryItem: {
    alignItems: "center",
    justifyContent: "center",
    width: "50%",
  },
  accountSummaryAmount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  accountSummaryLabel: {
    fontSize: 14,
    color: "#666",
  },
  transactionActions: {
    flex: 1,
    height: "auto",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
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
