import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Avatar, ListItem } from "@rneui/base";
import tw from "twrnc";
import {
  DocumentData,
  collection,
  db,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "../firebase";

const CustomListItem = ({
  id,
  chatName,
  enterChat,
}: {
  id: string;
  chatName: string;
  enterChat: (id: string, chatName: string) => void;
}) => {
  const [messages, setMessages] = useState<{ data: DocumentData }[]>([]);

  useLayoutEffect(() => {
    const q = query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "desc"),
      limit(1)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => ({
          data: doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [id]);

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => enterChat(id, chatName)}
    >
      <ListItem key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri:
              messages?.[0]?.data.photoURL ||
              "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
          }}
        />
        <ListItem.Content>
          <ListItem.Title style={tw`font-bold text-xl`}>
            {chatName}
          </ListItem.Title>
          <ListItem.Subtitle
            style={tw`text-gray-400`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {messages?.[0]?.data.displayName}: {messages?.[0]?.data.message}
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default CustomListItem;
