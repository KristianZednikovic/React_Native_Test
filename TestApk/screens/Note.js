import { View, Text, Button } from 'react-native'
import { auth } from "./../database/firebase-config";
import { db } from "./../database/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

import { TextInput, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Form from "./../components/form";
import { useFocusEffect } from '@react-navigation/native';

const Note = ({route, navigation}) => {

    const [notes, setNotes] = useState([]);
    const { singleNote } = route.params;

    
    useFocusEffect(
        React.useCallback(() => {

          getNotes();
            
        }, [])
      )

      const getNotes = () => {
        AsyncStorage.getItem('Notes')
          .then((notes) => {
            setNotes(JSON.parse(notes));
        })
      }

      const deteleNote = async () => {
            const newNotes = await notes.filter((note) => note !== singleNote)
            await AsyncStorage.setItem('Notes', JSON.stringify(newNotes))
                .then(() => navigation.navigate('Home'));
      }

        

  return (
    <SafeAreaView>
      <Text
        style={{
            textAlign: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 5,
            backgroundColor: '#000',
            color: '#fff',
            padding: 10,
        }}
      >{singleNote.toUpperCase()}</Text>

    <Text
        style={{
            fontSize: 20,
            color: '#000',
            padding: 10,

        }}
      >Value</Text>

      <Text
        style={{
            fontSize: 20,
            color: '#000',
            padding: 10,

        }}
      >Value</Text>

        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >

            <Button
                title="Edit"
                onPress={() => navigation.navigate('EditNote', {singleNote})}
            ></Button>

            <Button
                title="Delete"
                onPress={deteleNote}
            ></Button>


        </View>
    </SafeAreaView>
  )
}

export default Note