import React, {useRef} from 'react';
import {StyleSheet, View, FlatList, Animated, Platform} from 'react-native';

import Header from '../components/Header';
import Card from '../components/Card';

import {useSelector} from 'react-redux';

function HomeScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 40);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 40],
    outputRange: [0, Platform.OS === 'ios' ? -90 : -40],
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
        bounces={false}
        keyExtractor={item => item.id.videoId}
        onScroll={e => {
          scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
