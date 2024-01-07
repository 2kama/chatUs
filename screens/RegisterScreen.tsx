import { View } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import tw from "twrnc";
import { Button, Input, Text } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "../firebase";
import ErrorBox from "../components/ErrorBox";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageURL, setImageUrl] = useState("");
  const [errorCode, setErrorCode] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);

  const register = () => {
    setErrorCode("");
    setDisableBtn(true);
    if (!name) {
      setDisableBtn(false);
      return setErrorCode("noName");
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser!, {
          displayName: name,
          photoURL:
            imageURL ||
            "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
        }).then(() => {
          auth.currentUser?.reload();
        });
      })
      .then(() => {
        //I did this bcos firebase doesn't show updated values of users until the session is reloaded
        signOut(auth).then(() => {
          signInWithEmailAndPassword(auth, email, password);
        });
      })
      .catch((error) => {
        setErrorCode(error.code);
        setDisableBtn(false);
        console.log(error);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Back to Login",
    });
  }, [navigation]);

  return (
    <View style={tw`flex-1 items-center justify-center p-2 bg-white`}>
      <Text style={tw`mb-12 text-3xl`}>Create a chatUs Account</Text>

      <View style={tw`w-80`}>
        <Input
          placeholder="Full Name"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          value={imageURL}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={register}
        />
        {errorCode && <ErrorBox code={errorCode} />}
      </View>

      <Button
        raised
        title="Register"
        disabled={disableBtn}
        onPress={register}
        containerStyle={tw`w-60 mt-4 rounded`}
      />
    </View>
  );
};

export default RegisterScreen;
