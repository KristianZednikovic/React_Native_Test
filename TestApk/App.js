import { View, Text, StatusBar } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Login from "./screens/Login";
import Register from "./screens/Register";
import Home from "./screens/Home";

import Note from "./screens/Note";
import CreateNote from "./screens/CreateNote";
import EditNote from "./screens/EditNote";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />

      <Stack.Screen 
        name="Home" 
        component={Home}
        options={{
          headerShown: false,
          gestureEnabled: false, //disable go back to prev page
        }}
      />
      <Stack.Screen 
        name="CreateNote"
        component={CreateNote}
        options={{
          headerShown: false,
          gestureEnabled: false, //disable go back to prev page
        }}
      />

      <Stack.Screen 
        name="Note" 
        component={Note}
        options={{
          headerShown: false,
          gestureEnabled: false, //disable go back to prev page
        }}
      />

      <Stack.Screen
        name="EditNote"
        component={EditNote}
        options={{
          headerShown: false,
          gestureEnabled: false, //disable go back to prev page
        }}
      />

      <Stack.Screen name="Register" component={Register} />

    </Stack.Navigator>
    <StatusBar 
      barStyle="dark-content"
    />
  </NavigationContainer>
  );
}
