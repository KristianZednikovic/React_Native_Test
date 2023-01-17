import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Text, View, Button} from 'react-native';

export default function MatchesScreen({navigation, route}) {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [kills, setKills] = useState('');
  const [deaths, setDeaths] = useState('');
  const [assits, setAssists] = useState('');

  const getMatchInfo = async () => {
    try {
      const response = await fetch(
        'https://europe.api.riotgames.com/lol/match/v5/matches/' +
          route.params.paramKey[0][0] +
          '?api_key=RGAPI-af06d3b7-85c1-47b7-adf8-7c7b18dba569',
      );

      const json = await response.json();

      console.log(route.params.paramKey[1]);

      for (let i = 0; i < 10; i++) {
        const playerData = json['info']['participants'][i];
        if (playerData['summonerName'] == route.params.paramKey[1]) {
          setName(playerData['summonerName']);
          setPosition(playerData['teamPosition']);
          setKills(playerData['kills']);
          setDeaths(playerData['deaths']);
          setAssists(playerData['assists']);
        }
        console.log('Summoner name:', playerData['summonerName']);
        console.log('Team position: ', playerData['teamPosition']);
        console.log('Kills: ', playerData['kills']);
        console.log('Deaths: ', playerData['deaths']);
        console.log('Assists: ', playerData['assists']);
        console.log('');
      }
    } catch (error) {
      console.error(error);
    } finally {
      console.log('zavri picu');
    }
  };

  useEffect(() => {
    getMatchInfo();
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Summoner name: {name}</Text>
      <Text>Team position: {position}</Text>
      <Text>Kills: {kills}</Text>
      <Text>Deaths: {deaths}</Text>
      <Text>Assists: {assits}</Text>
    </View>
  );
}
