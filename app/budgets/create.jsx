import {
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  Text,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";

// Components
import { COLORS } from "../../src/constants/Colors";
import CustomAppBar from "../../src/components/common/CustomAppBar";
import Typo from "../../src/components/common/Typo";
import TextInput from "../../src/components/common/TextInput";
import Spacer from "../../src/components/common/Spacer";
import Button from "../../src/components/common/Button";
import { MultiSelect } from "react-native-element-dropdown";
import Icon from "../../src/components/common/Icon";

// Data
import { categories } from "../../src/mockData/categories";

const CreateBudeget = () => {
  const categoryItems = categories.map((cat) => ({
    label: cat.name,
    value: cat.id,
  }));
  const navigation = useNavigation();
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [budgetPeriod, setBudgetPeriod] = useState("Weekly");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const [categoryModalVisible, setCategoryModalVisible] = useState(false);

  const [showModalDatePicker, setShowModalDatePicker] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const handleStartChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      // setShowEndPicker(true);
    }
  };

  const handleEndChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const currenySymbol = "₱";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <CustomAppBar title="New Budget" onBack={() => navigation.goBack()} />
      <Spacer height={25} />
      <View style={styles.container}>
        <Typo fontSize={15} fontWeight="500">
          Budget Name
        </Typo>
        <TextInput
          value={budgetName}
          onChangeText={setBudgetName}
          placeholder={"Enter Budget Name"}
        />
        <Spacer height={15} />
        <Typo fontSize={15} fontWeight="500">
          Budget Amount ({currenySymbol})
        </Typo>
        <TextInput
          value={budgetAmount.toString()}
          onChangeText={(text) => {
            const numericValue = text.replace(/[^0-9.]/g, "");
            if (numericValue.split(".").length > 2) return;
            setBudgetAmount(parseFloat(numericValue) || 0);
          }}
          keyboardType="numeric"
          placeholder="0.00"
        />
        <Spacer height={15} />
        <Typo fontSize={15} fontWeight="500">
          Budget Period
        </Typo>
        <Spacer height={10} />
        <View style={styles.budgetPeriodBtnContainer}>
          <Button
            title={"Weekly"}
            style={[
              styles.budgetPeriodBtn,
              {
                backgroundColor:
                  budgetPeriod === "Weekly" ? COLORS.primary : COLORS.gray100,
              },
            ]}
            textStyle={{
              color:
                budgetPeriod === "Weekly" ? COLORS.textInverse : COLORS.text,
            }}
            onPress={() => setBudgetPeriod("Weekly")}
          />
          <Button
            title={"Monthly"}
            style={[
              styles.budgetPeriodBtn,
              {
                backgroundColor:
                  budgetPeriod === "Monthly" ? COLORS.primary : COLORS.gray100,
              },
            ]}
            textStyle={{
              color:
                budgetPeriod === "Monthly" ? COLORS.textInverse : COLORS.text,
            }}
            onPress={() => setBudgetPeriod("Monthly")}
          />
          <Button
            title={"Yearly"}
            style={[
              styles.budgetPeriodBtn,
              {
                backgroundColor:
                  budgetPeriod === "Yearly" ? COLORS.primary : COLORS.gray100,
              },
            ]}
            textStyle={{
              color:
                budgetPeriod === "Yearly" ? COLORS.textInverse : COLORS.text,
            }}
            onPress={() => setBudgetPeriod("Yearly")}
          />
          <Button
            title={"Custom"}
            style={[
              styles.budgetPeriodBtn,
              {
                backgroundColor:
                  budgetPeriod === "Custom" ? COLORS.primary : COLORS.gray100,
              },
            ]}
            textStyle={{
              color:
                budgetPeriod === "Custom" ? COLORS.textInverse : COLORS.text,
            }}
            onPress={() => {
              setBudgetPeriod("Custom");
              setShowModalDatePicker(true);
            }}
          />
        </View>
        <Spacer height={15} />
        <Typo fontSize={15} fontWeight="500">
          Category
        </Typo>
        <Spacer height={10} />
        <View style={styles.categoryChipsRow}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {selectedCategories.length === 0 ? (
              <Typo color={COLORS.textLight}>No category selected</Typo>
            ) : (
              categoryItems
                .filter((cat) => selectedCategories.includes(cat.value))
                .map((cat) => (
                  <View key={cat.value} style={styles.categoryChip}>
                    <Typo style={{ color: COLORS.textInverse, fontSize: 13 }}>
                      {cat.label}
                    </Typo>
                  </View>
                ))
            )}
          </ScrollView>
          <TouchableOpacity
            onPress={() => setCategoryModalVisible(true)}
            style={styles.plusButton}
          >
            <Icon name="Plus" size={18} color={COLORS.textInverse} />
          </TouchableOpacity>
        </View>
        <Modal visible={showModalDatePicker} animationType="slide" transparent>
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Date Range</Text>
              <View style={styles.dateRow}>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowStartPicker(true)}
                >
                  <Icon
                    name={"CalendarDays"}
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.dateText}>
                    Start: {startDate.toDateString()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dateButton}
                  onPress={() => setShowEndPicker(true)}
                >
                  <Icon
                    name={"CalendarDays"}
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text style={styles.dateText}>
                    End: {endDate.toDateString()}
                  </Text>
                </TouchableOpacity>
              </View>
              {showStartPicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleStartChange}
                />
              )}

              {showEndPicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display={Platform.OS === "ios" ? "inline" : "default"}
                  onChange={handleEndChange}
                />
              )}

              <View style={styles.pickerActions}>
                <Button
                  style={{
                    backgroundColor: COLORS.danger,
                  }}
                  textStyle={{ color: COLORS.textInverse }}
                  title="Cancel"
                  onPress={() => setShowModalDatePicker(false)}
                />
                <Button
                  style={{
                    backgroundColor: COLORS.primary,
                  }}
                  textStyle={{ color: COLORS.textInverse }}
                  title="Confirm"
                  onPress={() => {
                    console.log("Selected range:", startDate, endDate);
                    if (startDate > endDate) {
                      alert("Start date cannot be after end date.");
                      return;
                    }
                    setShowModalDatePicker(false);
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          visible={categoryModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setCategoryModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Typo fontSize={16} fontWeight="600" style={{ marginBottom: 10 }}>
                Select Categories
              </Typo>
              <MultiSelect
                style={styles.multiSelect}
                placeholderStyle={{ color: COLORS.textMuted }}
                selectedTextStyle={{ color: COLORS.primary }}
                data={categoryItems}
                labelField="label"
                valueField="value"
                placeholder="Select categories"
                value={selectedCategories}
                onChange={setSelectedCategories}
                // search
                renderItem={(item) => {
                  const isSelected = selectedCategories.includes(item.value);
                  return (
                    <View
                      style={[
                        styles.multiSelectItem,
                        {
                          backgroundColor: isSelected
                            ? COLORS.primary
                            : COLORS.white,
                        },
                      ]}
                    >
                      <Typo
                        style={{
                          color: isSelected ? COLORS.textInverse : COLORS.text,
                        }}
                      >
                        {item.label}
                      </Typo>
                    </View>
                  );
                }}
              />
              <Button
                title="Done"
                style={{ marginTop: 16 }}
                onPress={() => setCategoryModalVisible(false)}
              />
            </View>
          </View>
        </Modal>
        <Spacer height={20} />
        <Typo fontSize={15} fontWeight="500">
          Notes(Optional)
        </Typo>
        <TextInput
          style={{ height: 120 }}
          placeholder={"Add any notes about this budget"}
          multiline={true}
          numberOfLines={4}
        />

        <View style={styles.saveButtonContainer}>
          <Pressable
            style={styles.saveButton}
            // onPress={() => console.log("test")}
          >
            <Typo style={styles.saveButtonText}>Save Budget</Typo>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateBudeget;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    marginHorizontal: "auto",
  },
  budgetPeriodBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  budgetPeriodBtn: {
    backgroundColor: COLORS.gray100,
    color: COLORS.text,
    flex: 1,
    marginHorizontal: 2,
  },
  selectedBudgetPeriodBtn: {
    backgroundColor: COLORS.primary,
    color: COLORS.textInverse,
  },
  categoryChipsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  categoryChip: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  plusButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 8,
    marginLeft: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "90%",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 20,
  },
  multiSelect: {
    borderWidth: 1,
    borderColor: COLORS.gray200,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.gray100,
    minHeight: 40,
  },
  multiSelectItem: {
    padding: 10,
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
    color: COLORS.textInverse,
    fontSize: 18,
    fontWeight: "bold",
  },
  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    width: "90%",
    backgroundColor: COLORS.background,
    borderRadius: 12,
    padding: 20,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  pickerActions: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  dateRow: {
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },
  dateButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.gray100,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  dateText: {
    fontSize: 16,
    color: COLORS.text,
  },
});
