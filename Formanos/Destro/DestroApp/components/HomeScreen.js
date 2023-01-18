import React from 'react';
import {StyleSheet, Button, View, TextInput, Text} from 'react-native';



export default function HomeScreen({navigation}) {
  const [sumName, onChangeSumName] = React.useState('Pus5y Destro');

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Enter summoner name</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeSumName}
        value={sumName}
        placeholder="summoner name"
      />
      <Button
        title="Go to Data"
        onPress={() =>
          navigation.navigate('Summoner Info', {paramKey: sumName})
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
