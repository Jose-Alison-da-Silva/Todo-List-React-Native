import React from "react";
import { View } from "react-native";
import { styles } from "./style";

type Props = {
  color: string;
};

export default function Ball({ color }: Props) {
  return <View style={[styles.ball, { borderColor: color || "gray" }]} />;
}
