import DateTimePicker from "@react-native-community/datetimepicker"; // Import DateTimePicker
import { ArrowLeftRight, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"; // Added Platform
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/Spacer";

const CreateTransaction = () => {
  const [transactionType, setTransactionType] = useState("Expenses");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSaveTransaction = () => {
    // Here you can collect all the state and process it, e.g., send to an API or save to local storage.
    console.log("Saving Transaction:", {
      type: transactionType,
      amount: parseFloat(amount) || 0,
      description,
      date,
      // category and account would be added here once implemented
    });
  };

  return (
    <View style={styles.container}>
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

      {/* Transaction Details */}
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Description */}
        <Card style={{ padding: 15 }}>
          <Text style={styles.transactionCategoryLabel}>Description</Text>
          <View style={styles.descriptionContainer}>
            <View
              style={[
                styles.selectedCategoryIconContainer,
                { backgroundColor: "#E5E7EB" },
              ]}
            >
              <Icon name="pencil-outline" size={16} color="#4B5563" />
            </View>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Add a description"
              value={description}
              onChangeText={setDescription}
            />
          </View>
        </Card>
        <Spacer />
        {/* Category */}
        <Card style={{ padding: 10 }}>
          <Text style={styles.transactionCategoryLabel}>Category</Text>
          <View style={styles.selectCategory}>
            <View style={styles.selectedCategory}>
              <View style={styles.selectedCategoryIconContainer}>
                <Icon
                  name={"silverware-fork-knife"}
                  size={16}
                  color="#D62828"
                />
              </View>
              <Text>Food & Dining</Text>
            </View>
            <Icon name="chevron-right" size={24} />
          </View>
        </Card>

        <Spacer />
        {/* Account */}
        <Card style={{ padding: 15 }}>
          <Text style={styles.transactionCategoryLabel}>Account</Text>
          <View style={styles.selectCategory}>
            <View style={styles.selectedCategory}>
              <View
                style={[
                  styles.selectedCategoryIconContainer,
                  { backgroundColor: "#DBEAFE" },
                ]}
              >
                <Icon name={"credit-card"} size={16} color="#3B82F6" />
              </View>
              <View>
                <Text>Cash</Text>
                <Text>Php 9,000.00</Text>
              </View>
            </View>
            <Icon name="chevron-right" size={24} />
          </View>
        </Card>
        <Spacer />
        {/* Date */}
        <Card style={{ padding: 15 }}>
          <Text style={styles.transactionCategoryLabel}>Date</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={styles.selectCategory}
          >
            <View style={styles.selectedCategory}>
              <View
                style={[
                  styles.selectedCategoryIconContainer,
                  { backgroundColor: "#E0E7FF" },
                ]}
              >
                <Icon name="calendar-month-outline" size={16} color="#4F46E5" />
              </View>
              <Text>{date.toLocaleDateString()}</Text>
            </View>
            <Icon name="chevron-right" size={24} />
          </Pressable>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(Platform.OS === "ios");
                setDate(currentDate);
              }}
            />
          )}
        </Card>
        <Spacer />
      </ScrollView>

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.saveButton} onPress={handleSaveTransaction}>
          <Text style={styles.saveButtonText}>Save Transaction</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flex: 1,
  },
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
    alignItems: "center",
  },
  transationTypeItemIcon: {
    marginRight: 10,
    color: "#121212",
  },
  transationTypeItem: {
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
    backgroundColor: "#6366f1",
  },
  selectedTransationTypeItemText: {
    color: "#FFFFFF",
  },
  transactionAmount: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginHorizontal: "auto",
    marginTop: 20,
  },
  transactionCurrency: {
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
    width: 200,
  },
  transactionCategoryLabel: {
    marginBottom: 10,
  },
  selectCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCategoryIconContainer: {
    marginRight: 10,
    width: 35,
    height: 35,
    borderRadius: 30,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  descriptionContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  descriptionInput: {
    flex: 1,
    fontSize: 16,
    color: "#121212",
    paddingVertical: 5,
    marginLeft: 10,
  },
  scrollContentContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  saveButton: {
    backgroundColor: "#6366f1",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
