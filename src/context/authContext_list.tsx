import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { createContext, useContext, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Input from "../components/Input";
import { theme } from "../styles/theme";
import Flag from "../components/Flag";

export const AuthContextList = createContext({});

const flags = [
  { caption: "Urgente", color: theme.colors.red },
  { caption: "Optional", color: theme.colors.blueLight },
];

export const AuthProviderList = (props: any) => {
  const modalizeRef = useRef<Modalize>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFlag, setSelectedFlag] = useState("Urgente");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const _renderFlags = () => {
    return flags.map((item, index) => {
      return (
        <TouchableOpacity key={index}>
          <Flag caption={item.caption} color={item.color} />
        </TouchableOpacity>
      );
    });
  };

  const _container = () => {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={closeModal}>
            <MaterialIcons name="close" size={30} />
          </TouchableOpacity>

          <Text style={styles.title}>Criar Tarefa</Text>
          <TouchableOpacity>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Input
            title="Título:"
            labelStyle={styles.label}
            value={title}
            onChangeText={setTitle}
          />
          <Input
            title="Descrição:"
            labelStyle={styles.label}
            height={100}
            multiline
            numberOfLines={5}
            value={description}
            onChangeText={setDescription}
          />

          <View style={{ width: "40%" }}>
            <Input title="Tempo Limite:" labelStyle={styles.label} />
          </View>

          <View style={styles.containerFlags}>
            <Text style={styles.label}>Flags:</Text>
            <View style={styles.rowFlags}>{_renderFlags()}</View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  };

  return (
    <AuthContextList.Provider value={{ openModal }}>
      {props.children}

      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: 500 }}
        adjustToContentHeight={true}
      >
        {_container()}
      </Modalize>
    </AuthContextList.Provider>
  );
};

export const useAuthList = () => useContext(AuthContextList);

export const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  header: {
    width: "100%",
    height: 40,
    paddingHorizontal: 40,
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "space-between",
  },

  content: {
    width: "100%",
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
  },

  containerFlags: {
    width: "100%",
    padding: 10,
  },

  label: {
    fontWeight: "bold",
    color: "#000",
  },

  rowFlags: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
});
