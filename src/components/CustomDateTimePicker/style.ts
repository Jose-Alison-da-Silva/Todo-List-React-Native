import { theme } from "@/src/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.transparent,
  },

  container: {
    width: "80%",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 5,
    alignItems: "center",
  },

  dateText: {
    marginTop: 20,
    fontSize: 18,
    textAlign: "center",
  },
});
