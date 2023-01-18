import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Button,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function HomeScreen({navigation}) {
  const [sumName, onChangeSumName] = React.useState('Pus5y Destro');

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/icon.png')}
        //style={styles.image}
        imageStyle={{
          opacity: 0.4,
          width: 800,
          height: 800,
          position: 'absolute',
          top: -327,
          left: -222,
        }}>
        <Text style={styles.textos}>Enter summoner name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSumName}
          value={sumName}
          placeholder="summoner name"
        />
        <Button
          style={styles.buttonos}
          title="Go to Data"
          onPress={() =>
            navigation.navigate('Summoner Info', {paramKey: sumName})
          }
        />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D5C3',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: 'black',
    backgroundColor: 'white',
    textAlign:'center',
  },
  buttonos: {
    width: 20,
  },
  textos: {
    color: 'black',
    fontSize:35,
  },
});
