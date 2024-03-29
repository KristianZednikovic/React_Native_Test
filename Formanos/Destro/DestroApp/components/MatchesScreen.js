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
  const [playerWins, setPlayerWins] = useState(0);

  var kills = 0;
  var deaths = 0;
  var assists = 0;
  var wins = 0;
  var matchCards = [];
  var allCards = [];
  var count = 0;

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
            if (playerData['win'] === true) {
              wins++;
            }
          }

          matchCards = [
            ...matchCards,
            {
              summonerName: playerData['summonerName'],
              teamPosition: playerData['teamPosition'],
              kills: playerData['kills'],
              deaths: playerData['deaths'],
              assists: playerData['assists'],
              win: playerData['win'],
            },
          ];
        }
        setKill(kills / 10);
        setAssist(assists / 10);
        setDeath(deaths / 10);
        setKda((kills + assists) / deaths);
        setPlayerWins(wins * 10);
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
      console.log('konec more gadzino');
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
          if (count === 10) {
            count = 0;
          }
          if (count === 0) {
            count++;
            if (y.win === true) {
              return (
                <>
                  <Text style={{marginTop: 15, color: 'green'}}>
                    Team 1 win
                  </Text>
                  <View style={styles.textViewSummoner}>
                    <Text>{y.summonerName}</Text>
                    <Text>
                      Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
                    </Text>
                  </View>
                </>
              );
            } else {
              return (
                <>
                  <Text style={{marginTop: 15, color: 'red'}}>Team 1 lose</Text>
                  <View style={styles.textViewSummoner}>
                    <Text>{y.summonerName}</Text>
                    <Text>
                      Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
                    </Text>
                  </View>
                </>
              );
            }
          } else if (count !== 5) {
            count++;
            return (
              <View style={styles.textViewSummoner}>
                <Text>{y.summonerName}</Text>
                <Text>
                  Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
                </Text>
              </View>
            );
          } else {
            count++;
            if (y.win === true) {
              return (
                <>
                  <Text style={{marginTop: 15, color: 'green'}}>
                    Team 2 win
                  </Text>
                  <View style={styles.textViewSummoner}>
                    <Text>{y.summonerName}</Text>
                    <Text>
                      Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
                    </Text>
                  </View>
                </>
              );
            } else {
              return (
                <>
                  <Text style={{marginTop: 15, color: 'red'}}>Team 2 lose</Text>
                  <View style={styles.textViewSummoner}>
                    <Text>{y.summonerName}</Text>
                    <Text>
                      Kills: {y.kills} Deaths: {y.deaths} Assists: {y.assists}
                    </Text>
                  </View>
                </>
              );
            }
          }
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
          <Text style={styles.topText}>
            Average KDA: {kda.toFixed(2)}   Winrate: {playerWins}%
          </Text>
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
