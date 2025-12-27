import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';


const detail = () => {
    const params = useLocalSearchParams();
    
  return (
    <View>
      <Text>{params.name}</Text>
    </View>
  )
}

export default detail

