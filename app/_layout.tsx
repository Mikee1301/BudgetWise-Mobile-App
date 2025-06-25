import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      {/* <StatusBar barStyle="default" /> */}
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
