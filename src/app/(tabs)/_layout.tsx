import CustomTabBar from "@/src/components/CustomTabBar";
import { Tabs } from "expo-router";
import { AuthProviderList } from "@/src/context/authContext_list";

export default function TabLayout() {
  return (
    <AuthProviderList>
      <Tabs
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <CustomTabBar {...props} />}
      >
        <Tabs.Screen name="List" options={{ title: "List" }} />
        <Tabs.Screen name="User" options={{ title: "User" }} />
      </Tabs>
    </AuthProviderList>
  );
}
