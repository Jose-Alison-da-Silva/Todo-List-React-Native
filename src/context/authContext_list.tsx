import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dimensions,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { Modalize } from "react-native-modalize";
import Input from "../components/Input";
import { theme } from "../styles/theme";
import Flag from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PropCard } from "../app/(tabs)/List";

export const AuthContextList: any = createContext({});

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
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [item, setItem] = useState(0);

  const openModal = () => {
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
    clearStates();
  };

  useEffect(() => {
    getTasks();
  }, []);

  const _renderFlags = () => {
    return flags.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => setSelectedFlag(item.caption)}
        >
          <Flag
            caption={item.caption}
            color={item.color}
            selected={item.caption === selectedFlag}
          />
        </TouchableOpacity>
      );
    });
  };

  const handleSave = async () => {
    if (!title || !description || !selectedFlag) {
      return Alert.alert("Preencha todos os campos");
    }

    try {
      const data = {
        item: item !== 0 ? item : Date.now(),
        title: title,
        description: description,
        flag: selectedFlag,
        fullDate: new Date(
          selectedDate.getFullYear(),
          selectedDate.getMonth(),
          selectedDate.getDate(),
          selectedTime.getHours(),
          selectedTime.getMinutes()
        ).toISOString(),
      };
      const tasks = await AsyncStorage.getItem("task");
      let dataTasks = tasks ? JSON.parse(tasks) : [];

      const itemIndex = dataTasks.findIndex(
        (task: any) => task.item === data.item
      );

      if (itemIndex >= 0) {
        dataTasks[itemIndex] = data;
      } else {
        dataTasks.push(data);
      }

      await AsyncStorage.setItem("task", JSON.stringify(dataTasks));

      setTaskList(dataTasks);
      clearStates();
      closeModal();
    } catch (error) {
      console.log("Erro ao salvar", error);
    }
  };

  const clearStates = () => {
    setTitle("");
    setDescription("");
    setSelectedFlag("Urgente");
    setSelectedDate(new Date());
    setSelectedTime(new Date());
  };

  async function getTasks() {
    try {
      const tasks = await AsyncStorage.getItem("task");
      setTaskList(tasks ? JSON.parse(tasks) : []);
    } catch (error) {
      console.log("Erro ao carregar tasks", error);
    }
  }

  const handleDelete = async (itemToDelete: PropCard) => {
    try {
      const tasks = await AsyncStorage.getItem("task");
      const dataTasks = tasks ? JSON.parse(tasks) : [];

      const newDataTasks = dataTasks.filter(
        (task: any) => task.item !== itemToDelete.item
      );
      await AsyncStorage.setItem("task", JSON.stringify(newDataTasks));
      setTaskList(newDataTasks);
    } catch (error) {
      console.log("Erro ao deletar task", error);
    }
  };

  const handleEdit = async (itemToEdit: PropCard) => {
    try {
      setItem(itemToEdit.item);
      setTitle(itemToEdit.title);
      setDescription(itemToEdit.description);
      setSelectedFlag(itemToEdit.flag);

      const date = new Date(itemToEdit.fullDate);
      setSelectedDate(date);
      setSelectedTime(date);
      openModal();

      console.log("Data original ISO:", itemToEdit.fullDate);
      console.log("Objeto Date criado:", date);

      openModal();
    } catch (error) {
      console.log("Erro ao editar task", error);
    }
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
          <TouchableOpacity onPress={handleSave}>
            <AntDesign name="check" size={30} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Input
            title="Título:"
            labelStyle={styles.label}
            height={50}
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
            textAlignVertical="top"
          />

          <View style={{ width: "40%" }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={{ width: 150 }}
              >
                <Input
                  title="Data Limite:"
                  labelStyle={[styles.label]}
                  editable={false}
                  height={45}
                  value={selectedDate.toLocaleDateString()}
                  onPress={() => setShowDatePicker(true)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setShowTimePicker(true)}
                style={{ width: 130 }}
              >
                <Input
                  title="Hora Limite:"
                  labelStyle={[styles.label]}
                  editable={false}
                  height={45}
                  value={selectedTime.toLocaleTimeString()}
                  onPress={() => setShowTimePicker(true)}
                />
              </TouchableOpacity>
            </View>
            <CustomDateTimePicker
              onDateChange={setSelectedDate}
              setShow={setShowDatePicker}
              show={showDatePicker}
              type="date"
              initialValue={selectedDate}
            />

            <CustomDateTimePicker
              onDateChange={setSelectedTime}
              setShow={setShowTimePicker}
              show={showTimePicker}
              type="time"
              initialValue={selectedTime}
            />
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
    <AuthContextList.Provider
      value={{ openModal, taskList, handleDelete, handleEdit }}
    >
      {props.children}

      <Modalize
        ref={modalizeRef}
        childrenStyle={{ height: Dimensions.get("window").height / 1.7 }}
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
