// App.js
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import MatchesScreen from "./components/MatchesScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
          screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Summoner Info" component={AboutScreen} />
        <Stack.Screen name="Match Info" component={MatchesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}