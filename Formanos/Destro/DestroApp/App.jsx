// App.js
import * as React from "react";
import { useState, useEffect,useRef} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./components/HomeScreen";
import AboutScreen from "./components/AboutScreen";
import MatchesScreen from "./components/MatchesScreen";
import WithSplashScreen from "./components/SplashScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  const store = useRef(undefined);
  const queryClient = useRef(undefined);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 2000);

      return () => clearTimeout(timer);
  }, []);


  return (
    <WithSplashScreen isAppReady={isAppReady}>
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
    </WithSplashScreen>
  );
}