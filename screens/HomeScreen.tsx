import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { DocumentData, auth, collection, db, onSnapshot, orderBy, query, signOut } from "../firebase";
import CustomListItem from "../components/CustomListItem";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { Avatar } from "@rneui/base";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"

const HomeScreen = () => {
  const navigation = useNavigation();

  const [ chats, setChats ] = useState<{ id: string; data: DocumentData; }[]>([]);

  useEffect(() => {
    const q = query(collection(db, "chats"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setChats(querySnapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        })))
    });

    return unsubscribe
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Zignal",
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "black" },
      headerTintColor: "black",
      headerLeft: () => (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={() => signOut(auth)} style={tw`mr-3`}>
            <Avatar rounded source={{ uri: auth.currentUser?.photoURL! }} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={tw`flex-row justify-between w-20 mr-1`}>
            <TouchableOpacity activeOpacity={0.5}>
                <AntDesign name="camerao" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                <SimpleLineIcons name="pencil" size={24} color="black" />
            </TouchableOpacity>
        </View>
      )
    });
  }, []);

  const enterChat = (id: string, chatName: string) => {
    navigation.navigate('Chat', {
        id,
        chatName
    })
  }

  return (
    <ScrollView style={tw`h-full`}>
        {chats.map(({ id, data: { chatName }}) => (
            <CustomListItem id={id} chatName={chatName} key={id} enterChat={enterChat} />
        ))}
      
    </ScrollView>
  );
};

export default HomeScreen;
