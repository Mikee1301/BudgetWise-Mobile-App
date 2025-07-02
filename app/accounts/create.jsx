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
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../src/components/common/Spacer";
import CustomAppBar from "../../src/components/common/CustomAppBar";
import { COLORS } from "../../src/constants/colors";

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
  const [category, setCategory] = useState(accountCategories[0]);

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
        navigation.setOptions({ title: "Edit Account" });
      } catch (e) {
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
      // TODO: Implement actual state update or API call to update the account
    } else {
      const newAccount = { id: Date.now(), ...currentAccountData };
      // TODO: Implement actual state update or API call to save the new account
    }
    router.back();
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
              // TODO: Implement actual state update or API call to delete the account
              router.back();
            },
          },
        ]
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <CustomAppBar
        title={isEditMode ? "Edit Account" : "Add Account"}
        onBack={() => navigation.goBack()}
      />
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.formCard}>
          {/* <Text style={styles.title}>
            {isEditMode ? "Edit Account" : "Create New Account"}
          </Text> */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Savings, BPI Credit"
              value={accountName}
              onChangeText={setAccountName}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account Number</Text>
            <TextInput
              style={styles.input}
              placeholder="Last 4 digits or full"
              keyboardType="numeric"
              value={accountNo}
              onChangeText={setAccountNo}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Account Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                style={styles.picker}
                onValueChange={setCategory}
                dropdownIconColor="#6366F1"
              >
                {accountCategories.map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Initial Balance</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 10000"
              keyboardType="numeric"
              value={balance}
              onChangeText={setBalance}
              placeholderTextColor="#9CA3AF"
            />
          </View>
          <Spacer height={20} />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.saveButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={handleSaveAccount}
          >
            <Text style={styles.buttonText}>
              {isEditMode ? "Update Account" : "Add Account"}
            </Text>
          </Pressable>
          {isEditMode && (
            <>
              <Spacer height={10} />
              <Pressable
                style={({ pressed }) => [
                  styles.button,
                  styles.deleteButton,
                  pressed && { opacity: 0.8 },
                ]}
                onPress={handleDeleteAccount}
              >
                <Text style={styles.buttonText}>Delete Account</Text>
              </Pressable>
            </>
          )}
          <Spacer height={10} />
          {/* <View style={styles.divider} /> */}
          {/* <Spacer height={10} />
          <Pressable
            style={({ pressed }) => [
              styles.button,
              styles.cancelButton,
              pressed && { opacity: 0.8 },
            ]}
            onPress={() => router.back()}
          >
            <Text style={[styles.buttonText, styles.cancelButtonText]}>
              Cancel
            </Text>
          </Pressable> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CreateAccountScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  keyboardAvoiding: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  formCard: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    // borderRadius: 18,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // elevation: 1,
    // marginTop: 24,
    // marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
    color: "#111827",
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    height: 48,
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    backgroundColor: "#F9FAFB",
    fontSize: 16,
    color: "#111827",
  },
  pickerContainer: {
    borderColor: "#E5E7EB",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    overflow: "hidden",
  },
  picker: {
    height: 48,
    width: "100%",
    color: "#111827",
  },
  button: {
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    elevation: 0,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  deleteButton: {
    backgroundColor: COLORS.danger,
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#fff",
  },
  cancelButtonText: {
    color: "#6366F1",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    width: "100%",
    marginVertical: 4,
  },
});
