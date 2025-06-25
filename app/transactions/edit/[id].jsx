import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomAppBar from "../../../src/components/common/CustomAppBar";
import tinycolor from "tinycolor2";
import { useLocalSearchParams, useRouter } from "expo-router";
import { use, useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Minus, Plus } from "lucide-react-native";
import Card from "../../../src/components/common/Card";
import Icon from "../../../src/components/common/Icon";
import Spacer from "../../../src/components/common/Spacer";
// Data
import { categories } from "../../../src/mockData/categories";
import { accounts } from "../../../src/mockData/accounts";

const EditTransaction = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const { id } = params;

  const [isCategoryModalVisible, setCategoryModalVisible] = useState(false);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  // Extracting the transaction from params
  const transaction = params.transaction ? JSON.parse(params.transaction) : {};

  //  Find the category that matches the transaction's category
  const initialCategory = categories.find(
    (c) => c.name === transaction.category
  );

  const initialAccount = accounts.find((c) => c.name === transaction.account);
  //     State variables for the form
  const [description, setDescription] = useState(transaction.notes || "");
  const [date, setDate] = useState(
    transaction.date ? new Date(transaction.date) : new Date()
  );
  const [transactionType, setTransactionType] = useState("Expenses");
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || null
  );
  const [selectedAccount, setSelectedAccount] = useState(
    initialAccount || null
  );
  const [amount, setAmount] = useState(
    String(Math.abs(transaction.amount || 0))
  );

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCategoryModalVisible(false);
  };

  const handleSelectAccount = (account) => {
    setSelectedAccount(account);
    setAccountModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Appbar */}
      <CustomAppBar
        title="Edit Transaction"
        onBack={() => navigation.goBack()}
        onDelete={() => {
          // handle delete logic here
          alert("Delete transaction?");
        }}
      />
      <View style={styles.transactionBody}>
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
                transactionType === "Income" &&
                  styles.selectedTransationTypeItem,
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
          </View>
        </View>
        {/* Transaction Amount */}
        <View style={styles.transactionAmount}>
          <Text>Amount</Text>
          <TextInput
            style={styles.transactionsAmountInput}
            placeholder="Amount"
            keyboardType="numeric"
            value={amount}
          />
        </View>

        {/* Transaction Category */}
        <View style={styles.transactionSection}>
          <Text style={styles.transactionLabel}>Category</Text>
          <Card>
            <Pressable
              onPress={() => {
                setCategoryModalVisible(true);
              }}
              style={styles.selectCategory}
            >
              {selectedCategory ? (
                <View style={styles.selectedCategory}>
                  <View
                    style={[
                      styles.selectedCategoryIconContainer,
                      {
                        backgroundColor: tinycolor(selectedCategory.iconColor)
                          .setAlpha(0.3)
                          .toRgbString(),
                      },
                    ]}
                  >
                    <Icon
                      name={selectedCategory.icon}
                      size={16}
                      color={selectedCategory.iconColor}
                    />
                  </View>
                  <Text>{selectedCategory.name}</Text>
                </View>
              ) : (
                <Text style={styles.placeholderText}>Select a category</Text>
              )}
              <Icon name="ChevronRight" size={24} />
            </Pressable>
          </Card>
        </View>
        <Spacer height={10} />
        {/* Transaction Notes */}
        <View style={styles.transactionNotes}>
          <Text style={styles.transactionLabel}>Notes</Text>
          <View style={styles.descriptionContainer}>
            <TextInput
              style={styles.descriptionInput}
              placeholder="Notes"
              value={description}
              multiline
              numberOfLines={2}
              onChangeText={setDescription}
            />
          </View>
        </View>
        <View style={styles.transactionSection}>
          <Text style={styles.transactionLabel}>Date</Text>
          <Card>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              style={styles.selectDate}
            >
              <View style={styles.selectedDate}>
                <View
                  style={[
                    styles.selectedDateIcon,
                    { backgroundColor: "#E0E7FF" },
                  ]}
                >
                  <Icon name="Calendar" size={16} color="#4F46E5" />
                </View>
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
                  //   setShowDatePicker(Platform.OS === "ios");
                  setShowDatePicker(false);
                  setDate(currentDate);
                }}
              />
            )}
          </Card>
        </View>
        <Spacer height={10} />
        <View style={styles.transactionSection}>
          <Text style={styles.transactionLabel}>Account</Text>
          <Card>
            <Pressable
              onPress={() => setAccountModalVisible(true)}
              style={styles.accountSelectButton}
            >
              {selectedAccount ? (
                <View style={styles.accountSelectedInfo}>
                  <View
                    style={[
                      styles.accountSelectedIconContainer,
                      {
                        backgroundColor: tinycolor(selectedAccount.iconColor)
                          .setAlpha(0.3)
                          .toRgbString(),
                      },
                    ]}
                  >
                    <Icon
                      name={selectedAccount.icon}
                      size={16}
                      color={selectedAccount.iconColor}
                    />
                  </View>
                  <View>
                    <Text style={styles.accountSelectedName}>
                      {selectedAccount.name}
                    </Text>
                    <Text style={styles.accountSelectedBalance}>
                      {selectedAccount.currency} {selectedAccount.balance}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={styles.accountPlaceholderText}>
                  Select an account
                </Text>
              )}
              <Icon name="ChevronRight" size={24} />
            </Pressable>
          </Card>
        </View>
        <View style={styles.saveButtonContainer}>
          <Pressable
            style={styles.saveButtonPrimary}
            onPress={() => {
              /* handle save */
            }}
          >
            <Text style={styles.saveButtonText}>Save Transaction</Text>
          </Pressable>
        </View>

        {/* Modal for selecting a category */}
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
                        {
                          backgroundColor: tinycolor(item.iconColor)
                            .setAlpha(0.3)
                            .toRgbString(),
                        },
                        styles.selectedCategoryIconContainer,
                      ]}
                    >
                      <Icon name={item.icon} size={16} color={item.iconColor} />
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
        {/* Modal for selecting a account */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAccountModalVisible}
          onRequestClose={() => setAccountModalVisible(false)}
        >
          <View style={styles.accountModalOverlay}>
            <View style={styles.accountModalContent}>
              <Text style={styles.accountModalTitle}>Select an Account</Text>
              <FlatList
                data={accounts}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <Pressable
                    style={styles.accountListItem}
                    onPress={() => handleSelectAccount(item)}
                  >
                    <View
                      style={[
                        styles.accountListIconContainer,
                        {
                          backgroundColor: tinycolor(item.iconColor)
                            .setAlpha(0.3)
                            .toRgbString(),
                        },
                      ]}
                    >
                      <Icon name={item.icon} size={16} color={item.iconColor} />
                    </View>
                    <View style={styles.accountListDetails}>
                      <Text style={styles.accountListName}>{item.name}</Text>
                      <Text style={styles.accountListBalance}>
                        {item.currency} {item.balance}
                      </Text>
                    </View>
                  </Pressable>
                )}
              />
              <Pressable
                style={styles.accountModalCloseButton}
                onPress={() => setAccountModalVisible(false)}
              >
                <Text style={styles.accountModalCloseButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default EditTransaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
  },
  transactionBody: {
    paddingHorizontal: 10,
    alignItems: "center",
    paddingBottom: 200,
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
    width: "50%",
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
    width: "90%",
    height: 100,
  },
  transactionsAmountInput: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  transactionLabel: {
    marginBottom: 10,
  },
  selectCategory: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCategoryIconContainer: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCategory: {
    flexDirection: "row",
    alignItems: "center",
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
  transactionNotes: {
    height: 150,
    width: "90%",
  },
  descriptionInput: {
    fontSize: 16,
    color: "#121212",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 100,
    paddingTop: 10,
    textAlignVertical: "top",
    backgroundColor: "#F9FAFB",
  },
  transactionSection: {
    width: "90%",
  },
  selectDate: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedDate: {
    flexDirection: "row",
    alignItems: "center",
  },
  selectedDateIcon: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
  },
  accountModalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  accountModalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: "60%",
  },
  accountModalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  accountListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  accountListIconContainer: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  accountListDetails: {
    flex: 1,
  },
  accountListName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  accountListBalance: {
    fontSize: 14,
    color: "#6B7280",
  },
  accountModalCloseButton: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
  },
  accountModalCloseButtonText: {
    color: "#1F2937",
    fontSize: 16,
    fontWeight: "bold",
  },
  accountSection: {
    width: "90%",
    marginBottom: 16,
  },
  accountSectionLabel: {
    marginBottom: 10,
    fontWeight: "500",
    fontSize: 16,
    color: "#111827",
  },
  accountSelectButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  accountSelectedInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  accountSelectedIconContainer: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  accountSelectedName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  accountSelectedBalance: {
    fontSize: 14,
    color: "#6B7280",
  },
  accountPlaceholderText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  saveButtonContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#fff",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    flexDirection: "column",
    // gap: 10,
  },
  saveButtonPrimary: {
    backgroundColor: "#6366F1",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  saveButtonSecondary: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonSecondaryText: {
    color: "#6366F1",
    fontWeight: "bold",
    fontSize: 16,
  },
});
