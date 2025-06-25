import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";

// Component
import CustomAppBar from "../../src/components/common/CustomAppBar";
import IconInsideCicle from "../../src/components/common/IconInsideCicle";

const AccountInfo = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const account = params.account ? JSON.parse(params.account) : {};
  return (
    <SafeAreaView style={[styles.container]}>
      <CustomAppBar title="Account Info" onBack={() => navigation.goBack()} />
      <IconInsideCicle
        iconName={account.icon}
        iconSize={40}
        iconColor={account.iconColor}
      ></IconInsideCicle>
    </SafeAreaView>
  );
};

export default AccountInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
