import { FlatList, StyleSheet, View, useWindowDimensions } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";
import { LinearGradient } from "expo-linear-gradient";
import tinycolor from "tinycolor2";

// Components
import { COLORS } from "../../src/constants/Colors";
import Spacer from "../../src/components/common/Spacer";
import Typo from "../../src/components/common/Typo";
import Card from "../../src/components/common/Card";
import IconInsideCicle from "../../src/components/common/IconInsideCicle";

// Data
import { budgets } from "../../src/mockData/budgets";
import { Columns } from "lucide-react-native";

const Budgets = () => {
  const currenySymbol = "₱";
  const totalBudget = 10000;
  const remainingBudget = 1000;

  const { width } = useWindowDimensions();
  const cardHorizontalMargin = 20; // from your styles
  const cardPadding = 24; // from your styles
  const barWidth = width - cardHorizontalMargin * 2 - cardPadding * 2;

  const percentSpent = ((1 - remainingBudget / totalBudget) * 100).toFixed(0);
  return (
    <View style={styles.container}>
      <Spacer />
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryLight]}
        style={[styles.budgetSummaryCard]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.budgetSummaryCardInfo}>
          <View>
            <Typo color={COLORS.textMuted}>Total Budget</Typo>
            <Typo color={COLORS.textInverse} fontSize={20}>
              {currenySymbol}
              {totalBudget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Typo>
          </View>
          <View>
            <Typo color={COLORS.textMuted}>Remaining</Typo>
            <Typo color={COLORS.textInverse} fontSize={20}>
              {currenySymbol}
              {remainingBudget.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </Typo>
          </View>
        </View>
        <Spacer height={5} />
        <Progress.Bar
          progress={1 - remainingBudget / totalBudget}
          color={tinycolor(COLORS.primary).setAlpha(0.6).toRgbString()}
          unfilledColor={COLORS.textInverse}
          borderWidth={0}
          height={8}
          borderRadius={4}
          width={barWidth}
          style={{ marginTop: 16 }}
        />
        <Spacer height={5} />
        <Typo color={COLORS.textInverse}>
          {percentSpent} % spent this month
        </Typo>
      </LinearGradient>
      <Spacer height={20} />
      <Typo fontSize={18} fontWeight="500" style={styles.sectionTitle}>
        Budgets
      </Typo>

      <FlatList
        data={budgets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const spent = item.allocatedBudget - item.remainingBalance;
          const progress =
            item.allocatedBudget > 0
              ? Math.min(Math.max(spent / item.allocatedBudget, 0), 1)
              : 0;
          return (
            <Card style={styles.budgetCard}>
              <View style={styles.budgetCardInfo}>
                <IconInsideCicle
                  iconName={item.icon}
                  iconColor={item.iconColor}
                  iconSize={14}
                />
                <View style={styles.budgetCardInfo}>
                  <View>
                    <Typo fontWeight="500">{item.budgetName}</Typo>
                    <Typo color={COLORS.textLight}>
                      {currenySymbol}
                      {item.allocatedBudget.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </Typo>
                  </View>
                  <Typo
                    style={
                      item.remainingBalance < 0 ? { color: COLORS.danger } : {}
                    }
                  >
                    {currenySymbol}
                    {item.remainingBalance.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })}
                  </Typo>
                </View>
              </View>
              <Progress.Bar
                progress={progress}
                color={
                  item.remainingBalance < 0 ? COLORS.danger : COLORS.primary
                }
                unfilledColor={COLORS.gray100}
                borderWidth={0}
                height={8}
                borderRadius={4}
                width={null}
                style={{ marginTop: 16, width: "100%" }}
              />
            </Card>
          );
        }}
        // ListHeaderComponent={<Spacer height={5} />}
        // ListFooterComponent={<Spacer height={80} />}
        showsVerticalScrollIndicator={false}
      ></FlatList>
    </View>
  );
};

export default Budgets;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  budgetSummaryCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 24,
    minHeight: 140,
  },
  budgetSummaryCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    width: "90%",
    marginHorizontal: "auto",
  },
  budgetCard: {
    flexDirection: "columns",
    alignItems: "center",
    width: "90%",
    marginHorizontal: "auto",
    marginVertical: 10,
  },
  budgetCardInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 15,
  },
});
