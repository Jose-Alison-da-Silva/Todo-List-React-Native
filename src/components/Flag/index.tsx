import React from "react";
import { Text, View } from "react-native";
import { styles } from "./style";

type Props = {
  caption: string;
  color: string;
  selected?: boolean;
};

export default function Flag({ caption, color, selected }: Props) {
  return (
    <View
      style={[
        styles.flag,
        { backgroundColor: color },
        selected && { borderWidth: 2 },
      ]}
    >
      <Text style={{ color: "#fff", fontWeight: "bold" }}>{caption}</Text>
    </View>
  );
}
