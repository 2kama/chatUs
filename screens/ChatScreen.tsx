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
import React, { LegacyRef, MutableRefObject, useLayoutEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Avatar } from "@rneui/base";
import tw from "twrnc";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  DocumentData,
  addDoc,
  auth,
  collection,
  db,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "../firebase";

const ChatScreen = ({
  route: {
    params: { id, chatName },
  },
}: {
  route: { params: { id: string; chatName: string } };
}) => {
  const navigation = useNavigation();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { id: string; data: DocumentData }[]
  >([]);
  const scrollViewRef = useRef<any>();

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
              uri:
                messages[messages.length - 1]?.data.photoURL ||
                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
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
  }, [navigation, messages]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, `chats/${id}/messages`), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser?.displayName,
      email: auth.currentUser?.email,
      photoURL: auth.currentUser?.photoURL,
    })
      .then(() => {
        
        setInput("");
      })
      .catch((err) => console.log(err));

      await updateDoc(doc(db, `chats/${id}`), {
         timestamp: serverTimestamp()  
      })
  };

  useLayoutEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [id]);

  const showAvatar = (index: number, email: string) => {
    return (
      (index !== messages.length - 1 &&
        messages[index + 1].data.email !== email) ||
      index === messages.length - 1
    );
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <StatusBar style="light" />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView style={tw`flex-1`} ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
            {messages.map(({ id, data }, index) =>
              data.email === auth.currentUser?.email ? (
                <View
                  key={id}
                  style={tw`p-3 bg-[#ececec] self-end rounded-lg mr-4 mt-2 max-w-[70%] relative`}
                >
                  <Text style={tw``}>{data.message}</Text>
                </View>
              ) : (
                <View
                  key={id}
                  style={tw`p-3 bg-[#2b68e6] self-start rounded-lg ml-8 mt-2 max-w-[60%] relative`}
                >
                  {showAvatar(index, data.email) && (
                    <Avatar
                      rounded
                      size={30}
                      containerStyle={[tw`absolute`, { bottom: 5, left: -20 }]}
                      source={{ uri: data.photoURL }}
                    />
                  )}

                  <Text style={tw`text-xs text-white font-bold`}>
                    {data.displayName}
                  </Text>
                  <Text style={tw`text-white`}>{data.message}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={tw`flex-row items-center w-full p-4`}>
            <TextInput
              placeholder="Zignal Message"
              value={input}
              onChangeText={(text) => setInput(text)}
              style={tw`bottom-0 h-12 flex-1 mr-4 p-3 border-0 bg-[#ececec] text-gray-500 rounded-full`}
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
