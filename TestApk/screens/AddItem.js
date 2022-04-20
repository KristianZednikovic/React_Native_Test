import { View, Text, Button } from 'react-native'
import { auth } from "./../database/firebase-config";
import { db } from "./../database/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

import { TextInput, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'

const AddItem = ({navigation}) => {

  const [name, setName] = useState();

  // const save = async () => {
  //     try {

  //       // const jsonValue = JSON.stringify(name)
  //       // await AsyncStorage.setItem('Title', jsonValue)

  //       console.log("test")

  //       AsyncStorage.setItem('User',JSON.stringify(data));  

  //     } catch (error) {

  //         alert(error);

  //     }
  // };

  const save = async () => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(name));
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <View>
        <Text>SET TITLE</Text>
     <TextInput onChangeText={(text) => setName(text)} style={{backgroundColor: "#eeb"}}></TextInput>
     <Text
      style={{
        textAlign: "center",
      }}
      onPres
     >ADD ITEM</Text>
    <Button style={{textAlign: "center"}} title="ADD ITEM" onPress={save}></Button>
    <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          color: "white",
          textTransform: 'uppercase',
        }}
      
        >{name}</Text>
    </View>
  )
}

export default AddItem