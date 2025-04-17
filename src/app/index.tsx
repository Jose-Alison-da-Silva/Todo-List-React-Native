import React, { useState } from "react";
import { Text, View, StyleSheet, Image, Dimensions, Alert } from "react-native";
import { router } from "expo-router";
import Logo from "../assets/logo.png";
import { theme } from "../styles/theme";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Index() {
  const [email, setEmail] = useState("a");
  const [password, setPassword] = useState("a");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleLogin() {
    try {
      if (!email || !password) {
        return Alert.alert("Preencha todos os campos");
      }
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
        router.replace("/(tabs)/List");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTop}>
        <Image source={Logo} style={styles.Logo} />

        <Text style={styles.title}>Bem Vindo de Volta!</Text>
      </View>

      <View style={styles.boxMiddle}>
        <Input
          title="EMAIL"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          IconRight={MaterialIcons}
          iconRightName="email"
        />

        <Input
          title="SENHA"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          IconRight={Octicons}
          iconRightName={showPassword ? "eye" : "eye-closed"}
          secureTextEntry={!showPassword}
          OnIconRightPress={() => setShowPassword(!showPassword)}
        />
      </View>

      <View style={styles.boxBottom}>
        <Button text="Entrar" loading={loading} onPress={handleLogin} />
      </View>

      <Text>
        Não tem conta?{" "}
        <Text style={{ color: theme.colors.primary }}>Crie agora!</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  boxTop: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
    alignItems: "center",
    justifyContent: "center",
  },

  boxMiddle: {
    width: "100%",
    height: Dimensions.get("window").height / 4,
    paddingHorizontal: 40,
  },

  boxBottom: {
    width: "100%",
    height: Dimensions.get("window").height / 3,
    alignItems: "center",
  },

  Logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    marginTop: 40,
    fontWeight: "bold",
  },

  textBottom: {
    fontSize: 16,
    color: theme.colors.gray,
  },
});
