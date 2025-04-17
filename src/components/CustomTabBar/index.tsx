import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./style";
import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { theme } from "@/src/styles/theme";
import { AuthContextList } from "@/src/context/authContext_list";

export default function CustomTabBar(state: any) {
  const { openModal } = useContext<any>(AuthContextList);

  const goToScreen = (screen: string) => {
    state.navigation.navigate(screen);
  };

  return (
    <View style={styles.tabArea}>
      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goToScreen("List")}
      >
        <AntDesign
          name="bars"
          size={32}
          color={theme.colors.primary}
          style={{ opacity: state.state.index === 0 ? 1 : 0.3 }}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItemButton} onPress={openModal}>
        <View style={{ width: "100%", left: 10, top: 4 }}>
          <Entypo name="plus" size={40} color="white" />
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            width: "100%",
            right: 10,
            bottom: 10,
          }}
        >
          <MaterialIcons name="edit" size={30} color="white" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabItem}
        onPress={() => goToScreen("User")}
      >
        <FontAwesome
          name="user"
          style={{
            opacity: state.state.index === 1 ? 1 : 0.3,
            color: theme.colors.primary,
            fontSize: 32,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
