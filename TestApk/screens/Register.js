import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { auth } from "./../database/firebase-config";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Form from "./../components/form";

import Login from "./../screens/Login";

const Register = ({navigation}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const registerUser = () => {

        if (password == confirmPassword) { 

            createUserWithEmailAndPassword(auth, email, password)
                .then((pass) => {
                    console.log(pass);
                    navigation.navigate('Home');

                })
                .catch((error) => {
                    console.log(error);
                    Alert.alert(error.message);
                })
        } else {
            Alert.alert("Password and confirm password does not match");
        }


    }

  return (
    <SafeAreaView style={{ alignItems: "center", marginTop: 150 }}>

    <Text
      style={{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
      }}
    
    >Register</Text>

    <Form 
      labelText="Email" 
      placeholder="Enter email"
      onChangeText={value => setEmail(value)}
      value={email}
      keyboard={'email-address'}
    ></Form>

    <Form 
      labelText="Password" 
      placeholder="Enter password"
      onChangeText={value => setPassword(value)}
      value={password}
      secureTextEntry={true}
    ></Form>

    <Form 
      labelText="Password" 
      placeholder="Enter password again"
      onChangeText={value => setConfirmPassword(value)}
      value={confirmPassword}
      secureTextEntry={true}
    ></Form>


    <TouchableOpacity 
        style={{
            backgroundColor: "#000",
            width: 300, 
            padding: 10,
            color: "white", 
            marginTop: 10,
            alignItems: "center",
            alignSelf: "center",
        }}
        onPress={registerUser}
    >
        <Text
            style={{
                color: "#fff",
            }}
        >REGISTER</Text>
    </TouchableOpacity>

    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10}}>
      <Text>Continue as </Text>
      <Text 
        style={{ 
          color: "#999999" 
        }}
        onPress={() => navigation.navigate('Home')}
      >Guest</Text>
      <Text> or </Text>
      <Text 
        style={{ 
          color: "#999999" 
        }}
        onPress={() => navigation.navigate('Login')}
      >Login</Text>
    </View>

        {/* <TextInput placeholder="Email" value={email} onChangeText={text=>setEmail(text)}/>
        <TextInput placeholder="Password" value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/> */}
    </SafeAreaView>
  )
}

export default Register