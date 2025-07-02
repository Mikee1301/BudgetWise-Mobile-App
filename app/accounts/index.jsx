import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
// Components
import { COLORS } from "../../src/constants/colors";
import Card from "../../src/components/common/Card";
import Spacer from "../../src/components/common/Spacer";
import IconInsideCircle from "../../src/components/common/IconInsideCicle";

// Data
import { accounts } from "../../src/mockData/accounts";

const Accounts = () => {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filterItem = ["All", "Banks", "Cards", "Cash"];
  const [initialLayoutDone, setInitialLayoutDone] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingAccount, setEditingAccount] = useState(null);

  // Animation states
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const sliderPositionX = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(new Animated.Value(0)).current;
  const layoutsRef = useRef({});

  // State for new account form
  const [newAccountName, setNewAccountName] = useState("");
  const [newAccountBalance, setNewAccountBalance] = useState("");
  const [newAccountNo, setNewAccountNo] = useState("");
  const [newAccountCategory, setNewAccountCategory] = useState(filterItem[1]);

  const filteredAccounts = useMemo(() => {
    if (selectedFilter === "All") {
      return accounts;
    }
    return accounts.filter((account) => account.accountType === selectedFilter);
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

  const resetFormAndEditingState = () => {
    setEditingAccount(null);
    setNewAccountName("");
    setNewAccountBalance("");
    setNewAccountNo("");
    setNewAccountCategory(filterItem[1]);
  }; // This reset is now primarily for the edit modal
  return (
    <View style={[styles.container, { flex: 1 }]}>
      {/* <AppBar /> */}
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
                // router.push({
                //   pathname: "/create-account",
                //   params: { account: JSON.stringify(serializableAccountData) }, // Pass account as a stringified JSON
                // });
              }}
            >
              <View style={[styles.accountContainer, { marginTop: 15 }]}>
                <View style={styles.accountInfoWrapper}>
                  <IconInsideCircle
                    iconName={account.icon}
                    iconColor={account.iconColor}
                    iconSize={24}
                  />

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
        onPress={() => router.push("/accounts/create")}
      >
        <Plus size={28} color={COLORS.textInverse} />
      </TouchableOpacity>
    </View>
  );
};

export default Accounts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    backgroundColor: COLORS.gray100,
    margin: "auto",
    marginTop: 20,
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
    color: COLORS.text,
  },
  selectedFilterDisplay: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  sliderBackground: {
    position: "absolute",
    top: 4,
    left: 1,
    height: "80%",
    backgroundColor: COLORS.background,
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
  accountInfo: {
    justifyContent: "center",
  },
  accountInfoName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },
  accountInfoNo: {
    fontSize: 14,
    fontWeight: "400",
    color: COLORS.textLight,
    marginTop: 2,
  },
  accountBalance: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
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
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    elevation: 8,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
});
