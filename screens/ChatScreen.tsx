import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/base";
import tw from "twrnc";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { addDoc, auth, collection, db, serverTimestamp } from "../firebase";

const ChatScreen = ({
  route: {
    params: { id, chatName },
  },
}: {
  route: { params: { id: string; chatName: string } };
}) => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerBackTitleVisible: false,
      headerTitle: () => (
        <View style={tw`flex-row items-center`}>
          <Avatar
            rounded
            source={{
              uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
            }}
          />
          <Text style={tw`text-white ml-4 font-bold`}>{chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={tw`flex-row justify-between w-16 mr-1 `}>
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, `chats/${id}/messages`), {
        timestamp: serverTimestamp(),
        message: input,
        displayName: auth.currentUser?.displayName,
        email: auth.currentUser?.email,
        photoURL: auth.currentUser?.photoURL
    }).then(() => {
        setInput("");
    }).catch((err) => console.log(err))

  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="light" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={tw`flex-1`}></ScrollView>
          <View style={tw`flex-row items-center w-full p-4`}>
            <TextInput
              placeholder="Zignal Message"
              value={input}
              onChangeText={(text) => setInput(text)}
              style={tw`bottom-0 h-12 flex-1 mr-4 p-3 border-0 bg-[#ececec] text-gray-500 rounded-md`}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#2b68e6" />
            </TouchableOpacity>
          </View>
        </>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;
