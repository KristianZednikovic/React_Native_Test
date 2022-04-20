import { View, Text, TextInput, Button, SafeAreaView, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import { auth } from "./../database/firebase-config";
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Form from "./../components/form";

const Login = ({navigation}) => {

  const [isSignedIn, setIsSignedIn] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    
    const logIn = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((pass) => {
                console.log(pass);
                setIsSignedIn(true);
                navigation.navigate("Home");
                console.warn("Logged in successfully");
            })
            .catch((error) => {
                console.log(error);
                Alert.alert(error.message);
            })

    }

    const logOut = () => {

      signOut(auth)
          .then((pass) => {
              console.log(pass);
              setIsSignedIn(false);
              console.warn("Logged out successfully");
          })
          .catch((error) => {
              console.log(error);
              Alert.alert(error.message);
          })

  }

  return (
    <SafeAreaView style={{ alignItems: "center", marginTop: 150 }}>

    <Text
      style={{
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 30,
      }}
    
    >Login</Text>

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

    {isSignedIn == true ?

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
          onPress={logOut}
        >
            <Text
                style={{
                    color: "#fff",
                }}
            >Logout</Text>
        </TouchableOpacity>
    :
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
        onPress={logIn}
        >
            <Text
                style={{
                    color: "#fff",
                }}
            >Login</Text>
        </TouchableOpacity>
        
    }



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
        onPress={() => navigation.navigate('Register')}
      >Register</Text>
    </View>

        {/* <TextInput placeholder="Email" value={email} onChangeText={text=>setEmail(text)}/>
        <TextInput placeholder="Password" value={password} secureTextEntry={true} onChangeText={text=>setPassword(text)}/> */}
    </SafeAreaView>
  )
}

export default Login