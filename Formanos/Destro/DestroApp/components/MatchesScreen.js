import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, ActivityIndicator, Text, View, Button} from 'react-native';

export default function MatchesScreen({navigation, route}) {
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
        console.log('Summoner name:', playerData['summonerName']);
        console.log('Team position: ', playerData['teamPosition']);
        console.log('Kills: ', playerData['kills']);
        console.log('Deaths: ', playerData['deaths']);
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
      <Text>{route.params.paramKey}</Text>
    </View>
  );
}
