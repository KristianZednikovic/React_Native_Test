import { View, Text, Button, Dimensions, FlatList } from 'react-native'
import { auth } from "./../database/firebase-config";
import { db } from "./../database/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

import { TextInput, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Form from "./../components/form";
import { useFocusEffect } from '@react-navigation/native';


const CreateNote = ({navigation}) => {

    const [note, setNote] = useState('');

    const saveNote = async () => {

        if (note === '') { 
            Alert.alert('Please enter a note');
            return;
        }

        const value = await AsyncStorage.getItem('Notes');

        const n = value ? JSON.parse(value) : [];
        n.push(note);

        await AsyncStorage.setItem('Notes', JSON.stringify(n))
            .then(() => navigation.navigate('Home'));
        setNote('');
    }

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
          onPress={() => navigation.navigate('Home')}
        >GYM TRACKER</Text>

        <TextInput
            value={note}
            onChangeText={(value) => setNote(value)}
            placeholder="Enter note"
            style={{
                fontSize: 20,
                color: '#000',
                padding: 10,
            }}
        ></TextInput>

        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
            }}
        >

            <Button
                title="Discard"
                onPress={() => navigation.navigate('Home')}
            ></Button>

            <Button
                title="Save"
                onPress={saveNote}
            ></Button>


        </View>
    
    </SafeAreaView>
  )
}

export default CreateNote
