import { View, Text, Button, Dimensions, FlatList } from 'react-native'
import { auth } from "./../database/firebase-config";
import { db } from "./../database/firebase-config";
import { collection, getDocs } from "firebase/firestore/lite";

import { TextInput, SafeAreaView, TouchableOpacity, Alert, ScrollView} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Form from "./../components/form";
import { useFocusEffect } from '@react-navigation/native';

const Home = ({navigation}) => {


  const logOut = () => {

    signOut(auth)
        .then((pass) => {
            console.log(pass);
            navigation.navigate("Login");
        })
        .catch((error) => {
            console.log(error);
            Alert.alert(error.message);
        })
  };

        const [notes, setNotes] = useState([]);

        useEffect(
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

        const renderItem = ({item, index}) => (
          <ScrollView>

              <TouchableOpacity 
                style={{
                  justifyContent: 'center',
                }}
              >

                <View>
                  <Text 
                    onPress={() => navigation.navigate('Note', {singleNote:item})}
                    style={{
                      textAlign: 'center',
                      backgroundColor: '#000',
                      color: '#fff',
                      fontSize: 30,
                      fontWeight: 'bold',
                      padding: 10,
                      letterSpacing: 1,
                    }}
                  >{item.toUpperCase()}</Text>
                </View>

                  {/* <View><Text note >{item.date}</Text></View> */}
              </TouchableOpacity>

          </ScrollView>
        )




  return (
    <SafeAreaView>

      <View>

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

        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        ></FlatList>

        <Text
          onPress={() => navigation.navigate('CreateNote')}
          style={{
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: 20,
            padding: 20,
          }}
        >ADD ITEM</Text>
      </View>


    </SafeAreaView>

  )
}

export default Home