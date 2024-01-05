import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from '@rneui/base'
import tw from 'twrnc'

const CustomListItem = ({ id, chatName, enterChat }: { id: string; chatName: string; enterChat: (id: string, chatName: string) => void }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => enterChat(id, chatName)}>

<ListItem key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }}
        />
        <ListItem.Content>
            <ListItem.Title style={tw`font-bold text-xl`}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle style={tw`text-gray-400`} numberOfLines={1} ellipsizeMode='tail'>
                This is a test Subtitle
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>

    </TouchableOpacity>
    
  )
}

export default CustomListItem