import { CreditCard, PiggyBank } from "lucide-react-native";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppBar from "../../components/common/AppBar";
import Card from "../../components/common/Card";
import Spacer from "../../components/common/Spacer";

const Accounts = () => {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const filterItem = ["All", "Banks", "Cards", "Cash"];
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const sliderPositionX = useRef(new Animated.Value(0)).current;
  const sliderWidth = useRef(new Animated.Value(0)).current;
  const layoutsRef = useRef({}); // To store x and width of each filter item
  const [initialLayoutDone, setInitialLayoutDone] = useState(false);

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
              onPress={() =>
                console.log(`Card ID: ${account.id}, Name: ${account.name}`)
              }
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
});
