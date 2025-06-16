import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../components/common/Spacer";

const accountCategories = ["Banks", "Cards", "Cash"];
const CreateAccountScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);
  const [accountName, setAccountName] = useState("");
  const [balance, setBalance] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [category, setCategory] = useState(accountCategories[0]); // Default to first category

  useEffect(() => {
    if (params.account) {
      try {
        const accountData = JSON.parse(params.account);
        setEditingAccount(accountData);
        setIsEditMode(true);
        setAccountName(accountData.name);
        setBalance(accountData.balance.toString());
        setAccountNo(accountData.accountNo.toString());
        setCategory(accountData.category);
        navigation.setOptions({ title: "Edit Accounts" });
      } catch (e) {
        console.error("Failed to parse account data for editing:", e);
        Alert.alert("Error", "Could not load account data for editing.");
        router.back();
      }
    } else {
      navigation.setOptions({ title: "Create New Account" });
    }
  }, [params.account, navigation]);

  const handleSaveAccount = () => {
    if (!accountName || !balance || !accountNo) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }
    const currentAccountData = {
      name: accountName,
      balance: parseFloat(balance),
      accountNo: accountNo,
      category: category,
    };

    if (isEditMode && editingAccount) {
      const updatedAccount = { ...editingAccount, ...currentAccountData };
      console.log("Updating Account:", updatedAccount);
      // TODO: Implement actual state update or API call to update the account
    } else {
      const newAccount = { id: Date.now(), ...currentAccountData }; // Example ID
      console.log("Adding New Account:", newAccount);
      // TODO: Implement actual state update or API call to save the new account
    }

    router.back(); // Go back to the previous screen
  };

  const handleDeleteAccount = () => {
    if (isEditMode && editingAccount) {
      Alert.alert(
        "Delete Account",
        `Are you sure you want to delete ${editingAccount.name}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Delete",
            style: "destructive",
            onPress: () => {
              console.log("Deleting Account:", editingAccount);
              // TODO: Implement actual state update or API call to delete the account
              router.back();
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {isEditMode ? "Edit Account" : "Create New Account"}
        </Text>
        <Text style={styles.label}>Account Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Account Name (e.g., Savings, BPI Credit)"
          value={accountName}
          onChangeText={setAccountName}
        />
        <Text style={styles.label}>Account Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Account Number (last 4 digits if preferred)"
          keyboardType="numeric"
          value={accountNo}
          onChangeText={setAccountNo}
        />

        <Text style={styles.label}>Account Type:</Text>
        <Text style={styles.label}>Category:</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
          >
            {accountCategories.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>
        <Text style={styles.label}>Balance:</Text>
        <TextInput
          style={styles.input}
          placeholder="Balance (e.g., 10000)"
          keyboardType="numeric"
          value={balance}
          onChangeText={setBalance}
        />
        <Spacer height={10} />
        <Pressable
          style={[styles.button, styles.saveButton]}
          onPress={handleSaveAccount}
        >
          <Text style={styles.buttonText}>
            {isEditMode ? "Update Account" : "Add Account"}
          </Text>
        </Pressable>
        <Spacer height={10} />
        {isEditMode && (
          <>
            <Pressable
              style={[styles.button, styles.deleteButton]}
              onPress={handleDeleteAccount}
            >
              <Text style={styles.buttonText}>Delete Account</Text>
            </Pressable>
            <Spacer height={10} />
          </>
        )}
        <Pressable
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
        >
          <Text style={[styles.buttonText, styles.cancelButtonText]}>
            Cancel
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  label: { fontSize: 16, marginBottom: 5, marginTop: 5 },
  pickerContainer: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  picker: { height: 50, width: "100%" },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
  saveButton: { backgroundColor: "#6366f1" },
  cancelButton: { backgroundColor: "#EF4444" },
  deleteButton: { backgroundColor: "#DC2626" },
  buttonText: { color: "white", fontWeight: "bold", fontSize: 16 },
  cancelButtonText: { color: "white" },
});
