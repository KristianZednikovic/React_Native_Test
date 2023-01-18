import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Button, ButtonGroup, withTheme} from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';

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
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/icon.png')}
        style={styles.image}
        imageStyle={{
          opacity: 0.4,
          width: 800,
          height: 800,
          position: 'absolute',
          top: -0,
          left: -225,
        }}>
        <LinearGradient
          colors={['#4D3D3A', '#EAB246', '#FDD355']}
          style={styles.button}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Go Home</Text>
          </TouchableOpacity>
        </LinearGradient>

        {isLoading ? (
          <ActivityIndicator style={{width: 350}} />
        ) : (
          <>
            <View style={styles.sumInfo}>
              <Text style={styles.textik}>Summoner Name = {data.name}</Text>
              <Text style={styles.textik}>
                Summoner Level = {data.summonerLevel}
              </Text>
            </View>
            <View style={styles.buttonMatch}>
              <Button
                title="Get last 10 matches"
                onPress={() => {
                  navigation.navigate('Match Info', {
                    paramKey: [match, data.name],
                  });
                }}
              />
            </View>
          </>
        )}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#D3D5C3',
  },
  button: {
    width: 200,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  buttonText: {
    fontSize: 21,
    color: 'white',
    textAlign: 'center',
  },
  textik: {
    padding: 10,
    fontSize: 18,
    color: 'black',
  },
  image: {
    alignItems: 'center',
  },
  sumInfo: {
    width: 350,
  },
  buttonMatch: {
    width: 200,
  },
});
