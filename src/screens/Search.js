import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  FlatList,
  ActivityIndicator,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useTheme} from '@react-navigation/native';

import MiniCard from '../components/MiniCard';

import {useSelector, useDispatch} from 'react-redux';

//https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=songs&type=video&key=AIzaSyAlGQXKDpYiDC0UZzEGISDLAP8rGKVI8e8

function SearchScreen() {
  const {colors} = useTheme();
  const myColor = colors.iconColor;

  const navigation = useNavigation();

  const [value, setValue] = useState('');
  //const [miniCardData, setMiniCard] = useState([]);
  const dispatch = useDispatch();
  const miniCardData = useSelector(state => {
    return state.cardData;
  });
  const [loading, setLoading] = useState(false);
  function fetchData() {
    setLoading(true);
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&type=video&key=AIzaSyAlGQXKDpYiDC0UZzEGISDLAP8rGKVI8e8`,
    )
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        //setMiniCard(data.items);
        //console.log(data.items);
        dispatch({type: 'add', payload: data.items});
      });
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchBarContainer,
          {backgroundColor: colors.headerColor},
        ]}>
        <Icon
          style={{color: myColor}}
          name="md-arrow-back"
          size={32}
          onPress={() => navigation.goBack()}
        />
        <TextInput
          style={styles.searchBar}
          value={value}
          onChangeText={text => setValue(text)}
        />
        <Icon
          style={{color: myColor}}
          name="md-send"
          size={32}
          onPress={() => fetchData()}
        />
      </View>
      {loading ? (
        <ActivityIndicator style={{marginTop: 10}} size="large" color="red" />
      ) : null}
      <FlatList
        data={miniCardData}
        renderItem={({item}) => {
          return (
            <MiniCard
              videoId={item.id.videoId}
              title={item.snippet.title}
              channel={item.snippet.channelTitle}
            />
          );
        }}
        keyExtractor={item => item.id.videoId}
      />
    </View>
  );
}

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 47 : 0, //StatusBar.currentHeight,
  },
  searchBarContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    //For Android:
    elevation: 5,
    //
    //For IOS:
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    //
  },
  searchBar: {
    width: '70%',
    backgroundColor: '#e6e6e6',
    height: 35,
  },
});
