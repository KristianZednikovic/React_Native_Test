import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
} from 'react-native';

export default function MatchesScreen({navigation, route}) {
  const [cards, setCard] = useState([]);
  var karticka = [];

  const getMatchInfo = async () => {
    try {
      for (let i = 0; i < route.params.paramKey[0].length; i++) {
        const response = await fetch(
          'https://europe.api.riotgames.com/lol/match/v5/matches/' +
            route.params.paramKey[0][i] +
            '?api_key=RGAPI-af06d3b7-85c1-47b7-adf8-7c7b18dba569',
        );

        const json = await response.json();

        for (let i = 0; i < 10; i++) {
          const playerData = json['info']['participants'][i];
          // if (playerData['summonerName'] == route.params.paramKey[1]) {
          //   setName(playerData['summonerName']);
          //   setPosition(playerData['teamPosition']);
          //   setKills(playerData['kills']);
          //   setDeaths(playerData['deaths']);
          //   setAssists(playerData['assists']);
          // }

          karticka = [
            ...karticka,
            {
              key: karticka.length + 1,
              summonerName: playerData['summonerName'],
              teamPosition: playerData['teamPosition'],
              kills: playerData['kills'],
              deaths: playerData['deaths'],
              assists: playerData['assists'],
            },
          ];
        }

        setCard(karticka);
      }
      //--------
    } catch (error) {
      console.error(error);
    } finally {
      console.log('zavri picu');
    }
  };

  useEffect(() => {
    getMatchInfo();
  }, []);

  const matchList = cards.map(card => {
    return (
      <View style={styles.textView}>
        <Text>{card.summonerName}</Text>
        <Text>
          Kills: {card.kills} Deaths: {card.deaths} Assists: {card.assists}
        </Text>
        <Text></Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>{matchList}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  textView: {alignItems: 'center', justifyContent: 'center'},
});
