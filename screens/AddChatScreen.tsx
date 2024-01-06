import { View, Text } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import tw from 'twrnc'
import { Button, Input } from '@rneui/base'
import Icon from "react-native-vector-icons/FontAwesome"
import { addDoc, collection, db, serverTimestamp } from '../firebase'

const AddChatScreen = () => {

    const navigation = useNavigation();

    const [input, setInput] = useState("");

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Add a new Chat",
            headerBackTitle: "Chats"
        })
    }, [navigation]);

    const createChat = async () => {
        await addDoc(collection(db, "chats"), {
            chatName: input,
            timestamp: serverTimestamp()
        }).then(() => {
            navigation.goBack()
        })
    }

  return (
    <View style={tw`bg-white p-4 h-full`}>
      <Input placeholder='Enter a chat name' value={input} onChangeText={(text) => setInput(text)} 
        leftIcon={
            <Icon name="wechat" size={24} color="black" />
        }
        onSubmitEditing={createChat}
      />
      <Button title="Create new Chat" onPress={createChat} />
    </View>
  )
}

export default AddChatScreen