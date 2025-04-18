import React, { useEffect, useState } from "react";
import { Modal, Platform, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "./style";

type Props = {
  type: any;
  show: boolean;
  setShow: (value: boolean) => void;
  onDateChange: (date: any) => void;
  initialValue?: Date;
};

export default function CustomDateTimePicker({
  type,
  onDateChange,
  show,
  setShow,
  initialValue,
}: Props) {
  const [date, setDate] = useState(initialValue || new Date());

  useEffect(() => {
    if (initialValue) {
      setDate(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    if (onDateChange) {
      onDateChange(date);
    }
  }, [date, onDateChange]);

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    setShow(false);
  };

  return (
    <Modal
      transparent={true}
      visible={show}
      onRequestClose={() => setShow(false)}
    >
      <View style={styles.modalOverlay}>
        <View
          style={[
            styles.container,
            Platform.OS === "android" && { backgroundColor: "transparent" },
          ]}
        >
          <DateTimePicker
            value={date}
            mode={type}
            display={Platform.OS === "ios" ? "inline" : "default"}
            onChange={onChange}
          />
        </View>
      </View>
    </Modal>
  );
}
