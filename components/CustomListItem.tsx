import { View, Text } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from '@rneui/base'
import tw from 'twrnc'

const CustomListItem = ({ id, chatName, enterChat }: { id: string; chatName: string; enterChat: boolean }) => {
  return (
    <ListItem key={id} bottomDivider>
        <Avatar
          rounded
          source={{
            uri: "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
          }}
        />
        <ListItem.Content>
            <ListItem.Title style={tw`font-bold`}>
                {chatName}
            </ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail'>
                This is a test Subtitle
            </ListItem.Subtitle>
        </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem