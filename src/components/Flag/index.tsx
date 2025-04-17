import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./style";

type Props = {
  caption: string;
  color: string;
};

export default function Flag({ caption, color }: Props) {
  return (
    <TouchableOpacity style={[styles.flag, { backgroundColor: color }]}>
      <Text style={{ color: "#fff" }}>{caption}</Text>
    </TouchableOpacity>
  );
}
