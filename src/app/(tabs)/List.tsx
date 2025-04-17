import Ball from "@/src/components/Ball";
import Flag from "@/src/components/Flag";
import Input from "@/src/components/Input";
import { theme } from "@/src/styles/theme";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";

type PropCard = {
  item: number;
  title: string;
  description: string;
  flag: "urgente" | "optional";
};

const data: Array<PropCard> = [
  {
    item: 1,
    title: "Item 1",
    description: "Description item 1",
    flag: "urgente",
  },
  {
    item: 2,
    title: "Item 2",
    description: "Description item 2",
    flag: "urgente",
  },
  {
    item: 3,
    title: "Item 3",
    description: "Description item 3",
    flag: "urgente",
  },
];

export default function List() {
  const _renderCard = (item: PropCard) => {
    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.rowCard}>
          <View style={styles.rowCardLeft}>
            <Ball color="red" />

            <View>
              <Text style={styles.titleCard}>{item.title}</Text>
              <Text style={styles.descriptionCard}>{item.description}</Text>
            </View>
          </View>

          <Flag caption="Urgente" color={theme.colors.red} />
        </View>
      </TouchableOpacity>
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
          data={data}
          keyExtractor={(item) => item.item.toString()}
          renderItem={({ item }) => {
            return _renderCard(item);
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
    height: 60,
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
});
