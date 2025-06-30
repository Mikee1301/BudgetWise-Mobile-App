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
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import tinycolor from "tinycolor2";

// Components
import Icon from "../../src/components/common/Icon";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";
import CustomAppBar from "../../src/components/common/CustomAppBar";
import IconInsideCircle from "../../src/components/common/IconInsideCicle";

import { COLORS } from "../../src/constants/colors";

// Data
import { categories } from "../../src/mockData/categories";
import { accounts } from "../../src/mockData/accounts";

const CreateTransaction = () => {
  const navigation = useNavigation();
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
    <SafeAreaView style={styles.container}>
      <CustomAppBar
        title="Transaction Details"
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        {/* Transaction Type */}
        <View style={styles.typeSection}>
          <View style={styles.typeButtonGroup}>
            <Pressable
              onPress={() => setTransactionType("Expenses")}
              style={[
                styles.typeButton,
                transactionType === "Expenses" && styles.typeButtonSelected,
              ]}
            >
              <Minus
                style={[
                  styles.typeButtonIcon,
                  transactionType === "Expenses" &&
                    styles.typeButtonSelectedText,
                ]}
                size={16}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "Expenses" &&
                    styles.typeButtonSelectedText,
                ]}
              >
                Expenses
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTransactionType("Income")}
              style={[
                styles.typeButton,
                transactionType === "Income" && styles.typeButtonSelected,
              ]}
            >
              <Plus
                style={[
                  styles.typeButtonIcon,
                  transactionType === "Income" && styles.typeButtonSelectedText,
                ]}
                size={16}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "Income" && styles.typeButtonSelectedText,
                ]}
              >
                Income
              </Text>
            </Pressable>
            <Pressable
              onPress={() => setTransactionType("Transfer")}
              style={[
                styles.typeButton,
                transactionType === "Transfer" && styles.typeButtonSelected,
              ]}
            >
              <ArrowLeftRight
                style={[
                  styles.typeButtonIcon,
                  transactionType === "Transfer" &&
                    styles.typeButtonSelectedText,
                ]}
                size={16}
                strokeWidth={2}
              />
              <Text
                style={[
                  styles.typeButtonText,
                  transactionType === "Transfer" &&
                    styles.typeButtonSelectedText,
                ]}
              >
                Transfer
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Amount Input */}
        <View style={styles.amountSection}>
          <Text style={styles.amountCurrency}>PHP</Text>
          <View>
            <Text style={styles.amountLabel}>Amount</Text>
            <TextInput
              value={amount}
              onChangeText={(text) => {
                const numericValue = text.replace(/[^0-9.]/g, "");
                if (numericValue.split(".").length > 2) return;
                setAmount(numericValue);
              }}
              style={styles.amountInput}
              keyboardType="numeric"
              placeholder="0.00"
            />
          </View>
        </View>

        {/* Transaction Details */}
        <ScrollView
          contentContainerStyle={styles.detailsScrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Category */}
          <Text style={styles.label}>Category</Text>
          <Card>
            <Pressable
              onPress={() => setCategoryModalVisible(true)}
              style={styles.selectRow}
            >
              {selectedCategory ? (
                <View style={styles.selectedRow}>
                  <IconInsideCircle
                    iconName={selectedCategory.icon}
                    iconColor={selectedCategory.iconColor}
                    iconSize={15}
                  />
                  <Text>{selectedCategory.name}</Text>
                </View>
              ) : (
                <Text style={styles.placeholderText}>Select a category</Text>
              )}
              <Icon name="ChevronRight" size={24} />
            </Pressable>
          </Card>

          <Spacer height={10} />
          {/* Account */}
          <Text style={styles.label}>
            {transactionType === "Transfer" ? "From" : "Source"}
          </Text>
          <Card>
            <Pressable
              onPress={() => {
                setAccountModalTarget("from");
                setAccountModalVisible(true);
              }}
              style={styles.selectRow}
            >
              {selectedAccount ? (
                <View style={styles.selectedRow}>
                  <IconInsideCircle
                    iconName={selectedAccount.icon}
                    iconColor={selectedAccount.iconColor}
                    iconSize={15}
                  />
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
              <Icon name="ChevronRight" size={24} />
            </Pressable>
          </Card>

          {transactionType === "Transfer" && (
            <Text style={[styles.label, { marginTop: 10 }]}>To</Text>
          )}
          {transactionType === "Transfer" && (
            <Card style={{ marginTop: 5 }}>
              <Pressable
                onPress={() => {
                  setAccountModalTarget("to");
                  setAccountModalVisible(true);
                }}
                style={styles.selectRow}
              >
                {selectedAccountToTransfer ? (
                  <View style={styles.selectedRow}>
                    <IconInsideCircle
                      iconName={selectedAccountToTransfer.icon}
                      iconColor={selectedAccountToTransfer.iconColor}
                      iconSize={15}
                    />
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
                <Icon name="ChevronRight" size={24} />
              </Pressable>
            </Card>
          )}
          <Spacer height={10} />
          {/* Date */}
          <Text style={styles.label}>Date</Text>
          <Card>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.selectRow}
            >
              <View style={styles.selectedRow}>
                <IconInsideCircle
                  iconName="Calendar"
                  iconColor={COLORS.primary}
                  iconSize={15}
                />
                <Text>{date.toLocaleDateString()}</Text>
              </View>
              <Icon name="ChevronRight" size={24} />
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
          {/* Notes */}
          <Text style={styles.label}>Notes</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Add a Notes"
            value={description}
            multiline={true}
            numberOfLines={4}
            onChangeText={setDescription}
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalListItem}
                  onPress={() => handleSelectCategory(item)}
                >
                  <IconInsideCircle
                    iconName={item.icon}
                    iconColor={item.iconColor}
                    iconSize={15}
                  />
                  <Text style={styles.modalListItemText}>{item.name}</Text>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setCategoryModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
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
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Account</Text>
            <FlatList
              data={accounts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  style={styles.modalListItem}
                  onPress={() => handleSelectAccount(item)}
                >
                  <IconInsideCircle
                    iconName={item.icon}
                    iconColor={item.iconColor}
                    iconSize={15}
                  />
                  <View style={styles.modalListItemDetails}>
                    <Text style={styles.modalListItemText}>{item.name}</Text>
                    <Text style={styles.accountBalanceText}>
                      {item.currency} {item.balance}
                    </Text>
                  </View>
                </Pressable>
              )}
            />
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setAccountModalVisible(false)}
            >
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CreateTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  typeSection: {
    justifyContent: "center",
    alignItems: "center",
    height: 80,
    paddingVertical: 17,
  },
  typeButtonGroup: {
    height: "90%",
    width: "90%",
    borderRadius: 10,
    backgroundColor: COLORS.gray100,
    flexDirection: "row",
    alignItems: "center",
  },
  typeButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    width: "33.3%",
    height: "100%",
    flexDirection: "row",
  },
  typeButtonIcon: {
    marginRight: 10,
    color: COLORS.text,
  },
  typeButtonText: {
    color: COLORS.text,
  },
  typeButtonSelected: {
    backgroundColor: COLORS.primary,
  },
  typeButtonSelectedText: {
    color: COLORS.background,
  },
  amountSection: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    marginTop: 20,
  },
  amountCurrency: {
    marginHorizontal: "10%",
    marginTop: 20,
    fontSize: 30,
    color: COLORS.gray400,
  },
  amountLabel: {
    color: COLORS.textLight,
    fontSize: 15,
  },
  amountInput: {
    fontSize: 40,
    color: COLORS.text,
    width: 200,
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 10,
  },
  selectRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
  },
  notesInput: {
    flex: 1,
    fontSize: 16,
    height: 70,
    color: COLORS.text,
    paddingVertical: 5,
    textAlignVertical: "top",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    borderColor: COLORS.gray100,
    backgroundColor: COLORS.gray100,
  },
  accountBalanceText: {
    color: COLORS.textLight,
    fontSize: 12,
  },
  detailsScrollContent: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.background,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholderText: {
    color: COLORS.textLight,
    fontSize: 16,
    paddingVertical: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: COLORS.white,
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
  modalListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
  },
  modalListItemText: {
    fontSize: 16,
    marginLeft: 10,
  },
  modalListItemIcon: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  modalListItemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  modalCloseButton: {
    backgroundColor: COLORS.gray100,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "bold",
  },
});
