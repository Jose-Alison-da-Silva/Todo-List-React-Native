import React from "react";
import { theme } from "@/src/styles/theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function User() {
  const handleLogout = () => {
    return router.replace("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.name}>Alison</Text>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="exit" size={40} color={theme.colors.gray} />
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: "#f8f8f8",
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    color: "#333",
  },

  logoutButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
