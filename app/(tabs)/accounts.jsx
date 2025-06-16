import { useRouter } from "expo-router"; // Import useRouter
import { CreditCard, PiggyBank, Plus } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet, // Import Button for simplicity, or use TouchableOpacity
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/common/AppBar";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/Spacer";

const Accounts = () => {
  const router = useRouter(); // Initialize router
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filterItem = ["All", "Banks", "Cards", "Cash"];
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const sliderPositionX = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(new Animated.Value(0)).current;
  const layoutsRef = useRef({}); // To store x and width of each filter item
  const [initialLayoutDone, setInitialLayoutDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null); // To store the account being edited

  // State for new account form
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [newAccountNo, setNewAccountNo] = useState("");
  const [newAccountCategory, setNewAccountCategory] = useState(filterItem[1]); // Default to 'Banks' or first category

  const accounts = [
    {
      id: 1,
      name: "Savings",
      balance: 1000000,
      icon: <PiggyBank size={24} color="#10B981" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Banks",
    },
    {
      id: 2,
      name: "BPI",
      balance: 12485,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Cards",
    },
    {
      id: 3,
      name: "GCash",
      balance: 12485,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Cash", // Example for Cash
    },
    {
      id: 4,
      name: "UnionBank",
      balance: 12485,
      icon: <PiggyBank size={24} color="#10B981" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Banks",
    },
    {
      id: 5,
      name: "Metrobank Card",
      balance: 1000000,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Cards",
    },
    {
      id: 6,
      name: "Wallet",
      balance: 1000000,
      icon: <CreditCard size={24} color="#F59E0B" strokeWidth={2} />, // Example for Cash icon
      accountNo: 1234567,
      category: "Cash",
    },
    {
      id: 7,
      name: "BDO Savings",
      balance: 1000000,
      icon: <PiggyBank size={24} color="#10B981" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Banks",
    },
    {
      id: 8,
      name: "EastWest Card",
      balance: 1000000,
      icon: <CreditCard size={24} color="#6366F1" strokeWidth={2} />,
      accountNo: 1234567,
      category: "Cards",
    },
    {
      id: 9,
      name: "PayMaya",
      balance: 1000000,
      icon: <CreditCard size={24} color="#F59E0B" strokeWidth={2} />, // Example for Cash icon
      accountNo: 1234567,
      category: "Cash",
    },
  ];

  const filteredAccounts = useMemo(() => {
    if (selectedFilter === "All") {
      return accounts;
    }
    return accounts.filter((account) => account.category === selectedFilter);
  }, [accounts, selectedFilter]);

  useEffect(() => {
    // Text fade-in animation
    opacityAnim.setValue(0);
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedFilter]);

  useEffect(() => {
    // Slider animation
    if (initialLayoutDone && layoutsRef.current[selectedFilter]) {
      const { x, width } = layoutsRef.current[selectedFilter];

      Animated.parallel([
        Animated.spring(sliderPositionX, {
          toValue: x,
          useNativeDriver: false,
          bounciness: 2,
          speed: 12,
        }),
        Animated.spring(sliderWidth, {
          toValue: width,
          useNativeDriver: false,
          bounciness: 2,
          speed: 12,
        }),
      ]).start();
    }
  }, [selectedFilter, initialLayoutDone]);

  const openModalForEdit = (account) => {
    setEditingAccount(account);
    setNewAccountName(account.name);
    setNewAccountBalance(account.balance.toString());
    setNewAccountNo(account.accountNo.toString());
    setNewAccountCategory(account.category);
    setModalVisible(true);
  };

  const handleSaveAccount = () => {
    // Basic validation (can be expanded)
    if (!newAccountName || !newAccountBalance || !newAccountNo) {
      alert("Please fill all fields");
      return;
    }
    const accountData = {
      name: newAccountName,
      balance: parseFloat(newAccountBalance),
      accountNo: newAccountNo,
      category: newAccountCategory,
    };

    if (editingAccount) {
      console.log("Updating Account:", { ...editingAccount, ...accountData });
      // TODO: Here you would update the account in your state/backend
      // This part is for editing only now
    }
    // Adding new account is handled by create-account.jsx

    setModalVisible(false);
    resetFormAndEditingState();
  };

  const handleDeleteAccount = () => {
    if (editingAccount) {
      console.log("Deleting Account:", editingAccount);
      // TODO: Here you would delete the account from your state/backend
      setModalVisible(false);
      resetFormAndEditingState();
    }
  };

  const resetFormAndEditingState = () => {
    setEditingAccount(null);
    setNewAccountName("");
    setNewAccountBalance("");
    setNewAccountNo("");
    setNewAccountCategory(filterItem[1]);
  }; // This reset is now primarily for the edit modal
  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}>
      <AppBar />
      <Spacer height={10} />
      <View style={styles.filterContainer}>
        <Animated.View
          style={[
            styles.sliderBackground,
            {
              transform: [{ translateX: sliderPositionX }],
              width: sliderWidth,
            },
          ]}
        />
        {filterItem.map((item) => {
          const isSelected = selectedFilter === item;
          return (
            <TouchableOpacity
              key={item}
              onPress={() => setSelectedFilter(item)}
              style={styles.filterButton}
              onLayout={(event) => {
                const { x, width } = event.nativeEvent.layout;
                layoutsRef.current[item] = { x, width };

                if (item === selectedFilter && !initialLayoutDone) {
                  sliderPositionX.setValue(x);
                  sliderWidth.setValue(width);
                  setInitialLayoutDone(true);
                }
              }}
            >
              <Animated.Text
                style={[
                  styles.filterText,
                  isSelected && { opacity: opacityAnim },
                ]}
              >
                {item}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <FlatList
        style={styles.section}
        data={filteredAccounts}
        renderItem={({ item: account }) => (
          <View style={styles.listItemContainer}>
            <Card
              style={[
                styles.accountCard,
                {
                  paddingVertical: 2,
                },
              ]}
              onPress={() => {
                const { icon, ...serializableAccountData } = account;
                // Navigate to the create-account screen and pass account data
                router.push({
                  pathname: "/create-account",
                  params: { account: JSON.stringify(serializableAccountData) }, // Pass account as a stringified JSON
                });
              }}
            >
              <View style={[styles.accountContainer, { marginTop: 15 }]}>
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
              <Spacer />
            </Card>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<Spacer height={20} />}
      />
      <Spacer height={10} />
      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/create-account")} // Navigate to the new screen
      >
        <Plus size={28} color="#fff" />
      </TouchableOpacity>
      {/* <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          resetFormAndEditingState();
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <Text style={styles.modalTitle}>Edit Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Account Name (e.g., Savings, BPI Credit)"
              value={newAccountName}
              onChangeText={setNewAccountName}
            />
            <TextInput
              style={styles.input}
              placeholder="Balance (e.g., 10000)"
              keyboardType="numeric"
              value={newAccountBalance}
              onChangeText={setNewAccountBalance}
            />
            <TextInput
              style={styles.input}
              placeholder="Account Number (last 4 digits if preferred)"
              keyboardType="numeric"
              value={newAccountNo}
              onChangeText={setNewAccountNo}
            />
            <Text style={styles.label}>Category:</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={newAccountCategory}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  setNewAccountCategory(itemValue)
                }
              >
                {filterItem.slice(1).map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
            <Pressable
              style={[styles.modalButton, styles.saveButton]}
              onPress={handleSaveAccount}
            >
              <Text style={styles.modalButtonText}>Update Account</Text>
            </Pressable>
            <Spacer height={10} />
            {editingAccount && (
              <>
                <Pressable
                  style={[styles.modalButton, styles.deleteButton]}
                  onPress={handleDeleteAccount}
                >
                  <Text style={styles.modalButtonText}>Delete Account</Text>
                </Pressable>
                <Spacer height={10} />
              </>
            )}
            <Pressable
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => {
                setModalVisible(false);
                resetFormAndEditingState();
              }}
            >
              <Text style={[styles.modalButtonText, styles.cancelButtonText]}>
                Cancel
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Modal> */}
    </SafeAreaView>
  );
};

export default Accounts;

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
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "90%",
    height: 45,
    backgroundColor: "#f3f4f6",
    margin: "auto",
    borderRadius: 10,
    position: "relative",
  },
  filterButton: {
    paddingHorizontal: 28,
    paddingVertical: 5,
    borderRadius: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  filterText: {
    fontSize: 14,
    color: "#374151",
  },
  selectedFilterDisplay: {
    fontSize: 16,
    color: "#374151",
    textAlign: "center",
    marginTop: 10,
  },
  sliderBackground: {
    position: "absolute",
    top: 4,
    left: 1,
    height: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  accountCard: {
    marginBottom: 8,
  },
  accountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
  },
  transactionsCard: {
    padding: 0,
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
  fab: {
    position: "absolute",
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    right: 20,
    bottom: 20,
    backgroundColor: "#6366F1",
    borderRadius: 28,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 5,
  },
  pickerContainer: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  picker: {
    height: 50,
    width: "100%",
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  saveButton: {
    backgroundColor: "#6366F1",
  },
  cancelButton: {
    backgroundColor: "#EF4444",
  },
  deleteButton: {
    backgroundColor: "#DC2626", // A darker red for delete
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
