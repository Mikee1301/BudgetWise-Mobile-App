import { ArrowLeftRight, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

const CreateTransaction = () => {
  const [transactionType, setTransactionType] = useState("Expenses");
  const [amount, setAmount] = useState("");

  return (
    <View style={{ backgroundColor: "#FFFFFF", flex: 1 }}>
      {/* Transaction Type */}
      <View style={styles.transationType}>
        <View style={styles.transationTypeBox}>
          <Pressable
            onPress={() => setTransactionType("Expenses")}
            style={[
              styles.transationTypeItem,
              transactionType === "Expenses" &&
                styles.selectedTransationTypeItem,
            ]}
          >
            <Minus
              style={[
                styles.transationTypeItemIcon,
                transactionType === "Expenses" &&
                  styles.selectedTransationTypeItemText,
              ]}
              size={16}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.transationTypeItemText,
                transactionType === "Expenses" &&
                  styles.selectedTransationTypeItemText,
              ]}
            >
              Expenses
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTransactionType("Income")}
            style={[
              styles.transationTypeItem,
              transactionType === "Income" && styles.selectedTransationTypeItem,
            ]}
          >
            <Plus
              style={[
                styles.transationTypeItemIcon,
                transactionType === "Income" &&
                  styles.selectedTransationTypeItemText,
              ]}
              size={16}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.transationTypeItemText,
                transactionType === "Income" &&
                  styles.selectedTransationTypeItemText,
              ]}
            >
              Income
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setTransactionType("Transfer")}
            style={[
              styles.transationTypeItem,
              transactionType === "Transfer" &&
                styles.selectedTransationTypeItem,
            ]}
          >
            <ArrowLeftRight
              style={[
                styles.transationTypeItemIcon,
                transactionType === "Transfer" &&
                  styles.selectedTransationTypeItemText,
              ]}
              size={16}
              strokeWidth={2}
            />
            <Text
              style={[
                styles.transationTypeItemText,
                transactionType === "Transfer" &&
                  styles.selectedTransationTypeItemText,
              ]}
            >
              Transfer
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Amount Input */}
      <View style={styles.transactionAmount}>
        <Text style={styles.transactionCurrency}>PHP</Text>
        <View>
          <Text style={styles.amountTextInputLabel}>Amount</Text>
          <TextInput
            value={amount}
            onChangeText={(text) => {
              // Allow only numbers and a single decimal point
              const numericValue = text.replace(/[^0-9.]/g, "");
              // Prevent multiple decimal points
              if (numericValue.split(".").length > 2) {
                return;
              }
              setAmount(numericValue);
            }}
            style={styles.amountTextInput}
            keyboardType="numeric"
            placeholder="0.00"
          ></TextInput>
        </View>
      </View>
    </View>
  );
};

export default CreateTransaction;

const styles = StyleSheet.create({
  transationType: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingVertical: 17,
  },
  transationTypeBox: {
    height: "90%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "blue",
  },
  transationTypeItemIcon: {
    marginRight: 10,
    color: "#121212",
  },
  transationTypeItem: {
    // backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "33.3%",
    height: "100%",
    margin: "auto",
    flexDirection: "row",
  },
  transationTypeItemText: {
    color: "#121212",
  },
  selectedTransationTypeItem: {
    backgroundColor: "#EF4444",
  },
  selectedTransationTypeItemText: {
    color: "#FFFFFF",
  },
  transactionAmount: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    // backgroundColor: "green",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
  },
  transactionCurrency: {
    // backgroundColor: "gray",
    marginHorizontal: "10%",
    marginTop: 20,
    fontSize: 30,
    color: "#9CA3AF",
  },
  amountTextInputLabel: {
    color: "#6B74A1",
    fontSize: 15,
  },
  amountTextInput: {
    fontSize: 40,
    color: "#121212",
    // backgroundColor: "yellow",
  },
});
