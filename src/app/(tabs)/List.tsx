import Ball from "@/src/components/Ball";
import Flag from "@/src/components/Flag";
import Input from "@/src/components/Input";
import { AuthContextList } from "@/src/context/authContext_list";
import { theme } from "@/src/styles/theme";
import { formatDateToBR } from "@/src/utils/formatDate";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useRef } from "react";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

export type PropCard = {
  item: number;
  title: string;
  description: string;
  fullDate: string;
  flag: "Urgente" | "Optional";
};

interface AuthContextType {
  taskList: Array<PropCard>;
  openModal: void;
  handleEdit: (item: PropCard) => void;
  handleDelete: (item: PropCard) => void;
}

export default function List() {
  const { taskList, handleDelete, handleEdit } =
    useContext<AuthContextType>(AuthContextList);
  const swipeableRef = useRef([] as any);

  const rightActions = () => {
    return (
      <View style={styles.button}>
        <AntDesign name="delete" size={20} color="white" />
      </View>
    );
  };

  const leftActions = () => {
    return (
      <View
        style={[styles.button, { backgroundColor: theme.colors.blueLight }]}
      >
        <AntDesign name="edit" size={20} color="white" />
      </View>
    );
  };

  const handleSwipeOpen = (
    item: PropCard,
    index: number,
    direction: "right" | "left"
  ) => {
    if (direction === "right") {
      handleDelete(item);
    } else {
      handleEdit(item);
    }
    swipeableRef.current[index]?.close();
  };

  const _renderCard = (item: PropCard, index: number) => {
    const color =
      item.flag === "Urgente" ? theme.colors.red : theme.colors.blueLight;
    return (
      <Swipeable
        ref={(ref) => (swipeableRef.current[index] = ref)}
        key={index}
        renderRightActions={rightActions}
        renderLeftActions={leftActions}
        onSwipeableOpen={(direction) => handleSwipeOpen(item, index, direction)}
      >
        <View style={styles.card}>
          <View style={styles.rowCard}>
            <View style={styles.rowCardLeft}>
              <Ball color={color} />

              <View>
                <Text style={styles.titleCard}>{item.title}</Text>
                <Text style={styles.descriptionCard}>{item.description}</Text>
                <Text style={styles.descriptionCard}>
                  até {formatDateToBR(item.fullDate)}
                </Text>
              </View>
            </View>

            <Flag caption={item.flag} color={color} />
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Bom dia <Text style={{ fontWeight: "bold" }}>Alison</Text>
        </Text>

        <View style={styles.boxInput}>
          <Input IconLeft={MaterialIcons} iconLeftName="search" />
        </View>
      </View>

      <View style={styles.boxList}>
        <FlatList
          data={taskList}
          keyExtractor={(item) => item.item.toString()}
          renderItem={({ item, index }) => {
            return _renderCard(item, index);
          }}
          style={{ marginTop: 40, paddingHorizontal: 30 }}
        />
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },

  header: {
    width: "100%",
    height: Dimensions.get("window").height / 6,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  greeting: {
    fontSize: 20,
    color: "#fff",
    marginTop: 20,
  },

  boxInput: {
    width: "80%",
  },

  boxList: {
    flex: 1,
    width: "100%",
  },

  card: {
    width: "100%",
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 6,
    justifyContent: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
  },

  rowCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  rowCardLeft: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  titleCard: {
    fontWeight: "bold",
    fontSize: 16,
  },

  descriptionCard: {
    color: theme.colors.gray,
  },

  button: {
    backgroundColor: theme.colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 10,
    marginVertical: 10,
  },
});
