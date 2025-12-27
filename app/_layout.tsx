import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Home",headerTitleAlign: "center" }}
        
      />
      <Stack.Screen
        name="detail"
        options={{ title: "Detail",headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
