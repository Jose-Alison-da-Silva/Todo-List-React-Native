import { theme } from "@/src/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  boxInput: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    backgroundColor: theme.colors.lightGray,
    borderRadius: 40,
    marginTop: 10,
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    borderColor: theme.colors.lightGray,
  },

  input: {
    width: "90%",
    height: "100%",
    borderRadius: 40,
  },

  label: {
    marginLeft: 10,
    marginTop: 20,
    color: theme.colors.gray,
  },
});
