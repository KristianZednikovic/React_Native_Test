import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, Text, View, Button} from 'react-native';

export default function AboutScreen({navigation, route}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [match, setMatch] = useState([]);

  const getSummoner = useCallback(async () => {
    try {
      const response = await fetch(
        'https://eun1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' +
          route.params.paramKey +
          '?api_key=RGAPI-af06d3b7-85c1-47b7-adf8-7c7b18dba569',
      );

      const json = await response.json();

      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const getSummonererMatches = async () => {
    if (data.puuid !== undefined) {
      try {
        const response = await fetch(
          'https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/' +
            data.puuid +
            '/ids?start=0&count=10&api_key=RGAPI-af06d3b7-85c1-47b7-adf8-7c7b18dba569',
        );

        const json = await response.json();
        console.log('Matches =', json);

        setMatch(json);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getSummoner();
  }, []);

  useEffect(() => {
    getSummonererMatches();
  }, [data]);

  return (
    <View style={{flex: 1, padding: 24}}>
      <Button title="Go back" onPress={() => navigation.navigate('Home')} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <Text>Summoner Name = {data.name}</Text>
          <Text>Summoner Level = {data.summonerLevel}</Text>
          <Button
            title="Get last 10 matches"
            onPress={() => {
              navigation.navigate('Match Info', {
                paramKey: [match, data.name],
              });
            }}
          />
        </>
      )}
    </View>
  );
}
