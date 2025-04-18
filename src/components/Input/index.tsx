import React, { LegacyRef } from "react";

import { styles } from "./style";
import { theme } from "@/src/styles/theme";
import { FontAwesome, MaterialIcons, Octicons } from "@expo/vector-icons";
import {
  View,
  TextInput,
  Text,
  TextInputProps,
  TouchableOpacity,
  StyleProp,
  TextStyle,
} from "react-native";

type IconComponent =
  | React.ComponentType<React.ComponentProps<typeof MaterialIcons>>
  | React.ComponentType<React.ComponentProps<typeof FontAwesome>>
  | React.ComponentType<React.ComponentProps<typeof Octicons>>;

type Props = TextInputProps & {
  IconLeft?: IconComponent;
  IconRight?: IconComponent;
  iconLeftName?: string;
  iconRightName?: string;
  title?: string;
  OnIconLeftPress?: () => void;
  OnIconRightPress?: () => void;
  height?: number;
  labelStyle?: StyleProp<TextStyle>;
};

export default function Input(
  {
    IconLeft,
    IconRight,
    iconLeftName,
    iconRightName,
    title,
    OnIconLeftPress,
    OnIconRightPress,
    height,
    labelStyle,
    ...props
  }: Props,
  ref: LegacyRef<TextInput> | null
) {
  const calculateSizeWidth = () => {
    if (IconLeft && IconRight) {
      return "80%";
    } else if (IconLeft || IconRight) {
      return "90%";
    } else {
      return "100%";
    }
  };

  const calculateSizePaddingLeft = () => {
    if (IconLeft && IconRight) {
      return 0;
    } else if (IconLeft || IconRight) {
      return 10;
    } else {
      return 20;
    }
  };

  return (
    <>
      {title && <Text style={[styles.label, labelStyle]}>{title}</Text>}

      <View
        style={[
          styles.boxInput,
          { paddingLeft: calculateSizePaddingLeft(), height: height || 40 },
        ]}
      >
        {IconLeft && iconLeftName && (
          <TouchableOpacity onPress={OnIconLeftPress}>
            <IconLeft
              name={iconLeftName as any}
              size={20}
              color={theme.colors.gray}
              onPress={OnIconLeftPress}
              style={{ width: "100%" }}
            />
          </TouchableOpacity>
        )}

        <TextInput
          style={[
            styles.input,
            { width: calculateSizeWidth(), height: "100%" },
          ]}
          {...props}
          ref={ref}
        />

        {IconRight && iconRightName && (
          <TouchableOpacity onPress={OnIconRightPress}>
            <IconRight
              name={iconRightName as any}
              size={20}
              color={theme.colors.gray}
              onPress={OnIconRightPress}
              style={{ width: "100%" }}
            />
          </TouchableOpacity>
        )}
      </View>
    </>
  );
}
