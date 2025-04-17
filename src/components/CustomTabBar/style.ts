import { theme } from "@/src/styles/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabArea: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    height: 80,
    backgroundColor: "#FFF",
    borderTopColor: "black",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  tabItemButton: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 35,
    zIndex: 999,
    backgroundColor: theme.colors.primary,
    top: -30,
  },
});
