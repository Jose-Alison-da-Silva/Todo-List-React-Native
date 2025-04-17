import React from "react";
import {
  TouchableOpacity,
  ActivityIndicator,
  TouchableHighlightProps,
  Text,
} from "react-native";
import { styles } from "./style";

type Props = TouchableHighlightProps & {
  text: string;
  loading?: boolean;
};

export default function Button({ text, loading = false, ...rest }: Props) {
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.button} {...rest}>
      {loading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text style={styles.textButton}>Entrar</Text>
      )}
    </TouchableOpacity>
  );
}
