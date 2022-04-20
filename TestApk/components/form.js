import { View, Text, TextInput } from 'react-native'
import React from 'react'

const Form = ({
    labelText='',
    placeholderText='',
    onChangeText=null,
    value=null,
    ...more
}) => {
  return (
    <View>
      <Text>{labelText}</Text>
      <TextInput 
        style={{ 
            backgroundColor: "#e6e6e6", 
            width: 300, 
            height: 35, 
            color: "black", 
            padding: 10,
            marginBottom: 20,
        }}
        placeholder={placeholderText}
        onChangeText={onChangeText}
        value={value}
        {...more}
      />
    </View>
  )
}

export default Form;