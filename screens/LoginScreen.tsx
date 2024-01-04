import { View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Button, Input } from "@rneui/base";
import tw from "twrnc";
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
        source={require('../assets/logo.png')}
        style={tw`w-36 h-36 mb-8 rounded-lg`}
      />
      <View style={tw`w-80`}>
        <Input
          placeholder="Email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
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
