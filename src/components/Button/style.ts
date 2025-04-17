import { theme } from "@/src/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  textButton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
