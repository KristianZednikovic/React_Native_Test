import { View, Text, SafeAreaView, Button } from 'react-native'
import React from 'react'

const EditNote = ({navigation}) => {
  return (
    <SafeAreaView>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 5,
            backgroundColor: '#000',
            color: '#fff',
            padding: 10,
          }}
        >GYM TRACKER</Text>

      <Text
        style={{
            textAlign: 'center',
            fontSize: 30,
        }}
      >Preparing</Text>
        <Button
            title="Go Home"
            onPress={() => navigation.navigate('Home')}
        ></Button>

    </SafeAreaView>
  )
}

export default EditNote