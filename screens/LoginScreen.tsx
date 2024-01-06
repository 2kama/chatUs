import { View } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Image, Button, Input } from "@rneui/base";
import tw from "twrnc";
import { useNavigation } from "@react-navigation/native";
import { auth, signInWithEmailAndPassword } from "../firebase";
import ErrorBox from "../components/ErrorBox";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const signIn = () => {
    setErrorCode("");
    setDisableBtn(true);
    signInWithEmailAndPassword(auth, email, password).catch((error: any) => {
      setErrorCode(error.code);
      setDisableBtn(false);
    });
  };

  return (
    <View style={tw`flex-1 items-center justify-center p-2 bg-white`}>
      <StatusBar style="light" />
      <Image
        source={require("../assets/logo.png")}
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
          onSubmitEditing={signIn}
        />
        {errorCode && <ErrorBox code={errorCode} />}
      </View>

      <Button
        title="Login"
        onPress={signIn}
        raised
        containerStyle={tw`w-60 mt-4 rounded`}
        disabled={disableBtn}
      />
      <Button
        title="Register"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        containerStyle={tw`w-60 mt-4 rounded`}
      />
    </View>
  );
};

export default LoginScreen;
