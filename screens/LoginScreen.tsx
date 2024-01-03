import { View, Text } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image } from "@rneui/base";
import tw from "twrnc";
import { Button, Input } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
    const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const signIn = () => {

  }

  return (
    <View style={tw`flex-1 items-center justify-center p-2 bg-white`}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/2048px-Signal-Logo.svg.png",
        }}
        style={tw`w-36 h-36 mb-8 rounded`}
      />
      <View style={tw`w-80`}>
        <Input
          placeholder="Email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <Button title="Login" onPress={signIn} raised containerStyle={tw`w-60 mt-4 rounded`} />
      <Button title="Register" type="outline" onPress={() => navigation.navigate("Register")} containerStyle={tw`w-60 mt-4 rounded`} />
    </View>
  );
};

export default LoginScreen;
