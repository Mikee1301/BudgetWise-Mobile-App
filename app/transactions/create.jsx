import DateTimePicker from "@react-native-community/datetimepicker";
import { ArrowLeftRight, Minus, Plus } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";

// Data
import { categories } from "../../src/mockData/categories";
import { accounts } from "../../src/mockData/accounts";

// const accounts = [
//   {
//     id: "1",
//     name: "Cash",
//     balance: "9,000.00",
//     currency: "Php",
//     icon: "cash",
//     color: "#16A34A",
//     backgroundColor: "#D1FAE5",
//   },
//   {
//     id: "2",
//     name: "Bank Account",
//     balance: "50,000.00",
//     currency: "Php",
//     icon: "bank",
//     color: "#4F46E5",
//     backgroundColor: "#E0E7FF",
//   },
//   {
//     id: "3",
//     name: "Credit Card",
//     balance: "15,000.00",
//     currency: "Php",
//     icon: "credit-card",
//     color: "#3B82F6",
//     backgroundColor: "#DBEAFE",
//   },
// ];

const CreateTransaction = () => {
  const [transactionType, setTransactionType] = useState("Expenses");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedAccountToTransfer, setSelectedAccountToTransfer] =
    useState(null);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [accountModalTarget, setAccountModalTarget] = useState(null); // 'from' or 'to'

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };

  const handleSelectAccount = (account) => {
    if (accountModalTarget === "from") {
      if (
        transactionType === "Transfer" &&
        selectedAccountToTransfer?.id === account.id
      ) {
        Alert.alert(
          "Invalid Selection",
          "From and To accounts cannot be the same."
        );
        return;
      }
      setSelectedAccount(account);
    } else if (accountModalTarget === "to") {
      if (selectedAccount?.id === account.id) {
        Alert.alert(
          "Invalid Selection",
          "From and To accounts cannot be the same."
        );
        return;
      }
      setSelectedAccountToTransfer(account);
    }
    setAccountModalVisible(false);
    setAccountModalTarget(null);
  };

  const handleSaveTransaction = () => {
    // Here you can collect all the state and process it, e.g., send to an API or save to local storage.
    console.log("Saving Transaction:", {
      type: transactionType,
      amount: parseFloat(amount) || 0,
      description,
      date,
      category: selectedCategory,
      account: selectedAccount,
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
        <Card>
          <Text style={styles.transactionCategoryLabel}>Description</Text>
          <View style={styles.descriptionContainer}>
            <View
              style={[
                styles.selectedCategoryIconContainer,
                { backgroundColor: "#E5E7EB" },
              ]}
            >
              <Icon name="Pencil" size={16} color="#4B5563" />
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
        <Card>
          <Text style={styles.transactionCategoryLabel}>Category</Text>
          <Pressable
            onPress={() => setCategoryModalVisible(true)}
            style={styles.selectCategory}
          >
            {selectedCategory ? (
              <View style={styles.selectedCategory}>
                <View
                  style={[
                    styles.selectedCategoryIconContainer,
                    { backgroundColor: selectedCategory.backgroundColor },
                  ]}
                >
                  <Icon
                    name={selectedCategory.icon}
                    size={16}
                    color={selectedCategory.color}
                  />
                </View>
                <Text>{selectedCategory.name}</Text>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select a category</Text>
            )}
            <Icon name="chevron-right" size={24} />
          </Pressable>
        </Card>

        <Spacer />
        {/* Account */}
        <Card>
          <Text style={styles.transactionCategoryLabel}>
            {transactionType === "Transfer" ? "From" : "Source"}
          </Text>
          <Pressable
            onPress={() => {
              setAccountModalTarget("from");
              setAccountModalVisible(true);
            }}
            style={styles.selectCategory}
          >
            {selectedAccount ? (
              <View style={styles.selectedCategory}>
                <View
                  style={[
                    styles.selectedCategoryIconContainer,
                    { backgroundColor: selectedAccount.backgroundColor },
                  ]}
                >
                  <Icon
                    name={selectedAccount.icon}
                    size={16}
                    color={selectedAccount.color}
                  />
                </View>
                <View>
                  <Text>{selectedAccount.name}</Text>
                  <Text style={styles.accountBalanceText}>
                    {selectedAccount.currency} {selectedAccount.balance}
                  </Text>
                </View>
              </View>
            ) : (
              <Text style={styles.placeholderText}>Select an account</Text>
            )}
            <Icon name="chevron-right" size={24} />
          </Pressable>
        </Card>

        {transactionType === "Transfer" && (
          <Card style={{ marginTop: 15 }}>
            <Text style={styles.transactionCategoryLabel}>To</Text>
            <Pressable
              onPress={() => {
                setAccountModalTarget("to");
                setAccountModalVisible(true);
              }}
              style={styles.selectCategory}
            >
              {selectedAccountToTransfer ? (
                <View style={styles.selectedCategory}>
                  <View
                    style={[
                      styles.selectedCategoryIconContainer,
                      {
                        backgroundColor:
                          selectedAccountToTransfer.backgroundColor,
                      },
                    ]}
                  >
                    <Icon
                      name={selectedAccountToTransfer.icon}
                      size={16}
                      color={selectedAccountToTransfer.color}
                    />
                  </View>
                  <View>
                    <Text>{selectedAccountToTransfer.name}</Text>
                    <Text style={styles.accountBalanceText}>
                      {selectedAccountToTransfer.currency}{" "}
                      {selectedAccountToTransfer.balance}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.placeholderText}>Select an account</Text>
              )}
              <Icon name="chevron-right" size={24} />
            </Pressable>
          </Card>
        )}
        <Spacer />
        {/* Date */}
        <Card>
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
                <Icon name="Calendar" size={16} color="#4F46E5" />
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

      {/* Category Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCategoryModalVisible}
        onRequestClose={() => setCategoryModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.categoryItem}
                  onPress={() => handleSelectCategory(item)}
                >
                  <View
                    style={[
                      styles.selectedCategoryIconContainer,
                      { backgroundColor: item.backgroundColor },
                    ]}
                  >
                    <Icon name={item.icon} size={16} color={item.color} />
                  </View>
                  <Text style={styles.categoryItemText}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setCategoryModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Account Selection Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isAccountModalVisible}
        onRequestClose={() => setAccountModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Account</Text>
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.categoryItem}
                  onPress={() => handleSelectAccount(item)}
                >
                  <View
                    style={[
                      styles.selectedCategoryIconContainer,
                      { backgroundColor: item.backgroundColor },
                    ]}
                  >
                    <Icon name={item.icon} size={16} color={item.color} />
                  </View>
                  <View style={styles.accountItemDetails}>
                    <Text style={styles.categoryItemText}>{item.name}</Text>
                    <Text style={styles.accountBalanceText}>
                      {item.currency} {item.balance}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.closeButton}
              onPress={() => setAccountModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 16,
    paddingVertical: 10,
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "60%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  categoryItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  closeButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountBalanceText: {
    color: "#6B7280",
    fontSize: 12,
  },
  accountItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
});
