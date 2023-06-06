import React, {useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Animated,
} from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';

import {useSelector} from 'react-redux';

function LittleCard({name}) {
  return (
    <View style={styles.littleCardContainer}>
      <Text style={styles.littleCardText}>{name}</Text>
    </View>
  );
}

function ExploreScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 40);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 40],
    outputRange: [0, -87],
  });

  const cardData = useSelector(state => {
    return state.cardData;
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{translateY: translateY}],
          elevation: 4,
          zIndex: 100,
        }}>
        <Header />
      </Animated.View>
      <ScrollView
        bounces={false}
        nestedScrollEnabled={true}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
        scrollEventThrottle={16}>
        <View style={styles.littleCardsContainer}>
          <LittleCard name="Gaming" />
          <LittleCard name="Trending" />
          <LittleCard name="Music" />
          <LittleCard name="News" />
          <LittleCard name="Movies" />
          <LittleCard name="Fashion" />
        </View>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryText}>Trending Videos</Text>
        </View>
        <FlatList
          data={cardData}
          renderItem={({item}) => {
            return (
              <Card
                videoId={item.id.videoId}
                title={item.snippet.title}
                channel={item.snippet.channelTitle}
              />
            );
          }}
          keyExtractor={item => item.id.videoId}
        />
      </ScrollView>
    </View>
  );
}

export default ExploreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  littleCardContainer: {
    backgroundColor: 'red',
    height: 50,
    width: 160,
    borderRadius: 4,
    marginTop: 5,
  },
  littleCardText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 22,
    marginTop: 5,
  },
  littleCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 45,
  },
  categoryContainer: {
    borderBottomWidth: 1,
    margin: 8,
  },
  categoryText: {
    fontSize: 22,
  },
});
