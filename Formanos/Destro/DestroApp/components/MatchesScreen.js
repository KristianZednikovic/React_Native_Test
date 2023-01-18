import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Button,
  ImageBackground,
} from 'react-native';

export default function MatchesScreen({navigation, route}) {
  const [cards, setCard] = useState([]);
  const [kda, setKda] = useState(0);
  const [kill, setKill] = useState(0);
  const [death, setDeath] = useState(0);
  const [assist, setAssist] = useState(0);

  var kills = 0;
  var deaths = 0;
  var assists = 0;
  var matchCards = [];
  var allCards = [];

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
          if (playerData['summonerName'] == route.params.paramKey[1]) {
            kills += playerData['kills'];
            deaths += playerData['deaths'];
            assists += playerData['assists'];
          }

          matchCards = [
            ...matchCards,
            {
              summonerName: playerData['summonerName'],
              teamPosition: playerData['teamPosition'],
              kills: playerData['kills'],
              deaths: playerData['deaths'],
              assists: playerData['assists'],
            },
          ];
        }
        setKill(kills / 10);
        setAssist(assists / 10);
        setDeath(deaths / 10);
        setKda((kills + assists) / deaths);
        allCards = [
          ...allCards,
          {matchId: route.params.paramKey[0][i], match: matchCards},
        ];
        matchCards = [];
      }
      setCard(allCards);
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
        <Text>Match: {card.matchId}</Text>
        {card.match.map(y => {
          return (
            <View style={styles.textViewSummoner}>
              <Text>{y.summonerName}</Text>
              <Text>
                Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
              </Text>
            </View>
          );
        })}
        <Text></Text>
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/icon.png')}
        style={styles.image}
        imageStyle={{
          opacity: 0.4,
          width: 800,
          height: 800,
          position: 'absolute',
          top: 0,
          left: -222,
        }}>
        <View style={styles.containerTop}>
          <Text style={styles.topText}>
            Average kills: {kill}, deaths: {death}, assists: {assist}
          </Text>
          <Text style={styles.topText}>Average KDA: {kda.toFixed(2)}</Text>
        </View>
        <ScrollView
          contentContainerStyle={{display: 'flex', justifyContent: 'center'}}>
          {matchList}
        </ScrollView>
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
  containerTop: {
    textAlign: 'center',
    justifyContent: 'center',

    width: 350,
  },
  textView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    padding: 5,
    margin: 5,
    backgroundColor: 'black',
    width: 250,
  },
  textViewSummoner: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'grey',
  },
  topText: {
    color: 'black',
  },
  image: {
    alignItems: 'center',
  },
});
