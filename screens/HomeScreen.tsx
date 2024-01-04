import { View, Text } from 'react-native'
import React from 'react'
import { auth } from '../firebase'

const HomeScreen = () => {

    console.log(auth.currentUser)

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen