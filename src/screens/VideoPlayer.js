import React from 'react';
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native';
import {WebView} from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

function VideoPlayerScreen(props) {
  const route = useRoute();
  const {videoId, title} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.videoPlayerScreen}>
        <WebView
          javaScriptEnabled={true}
          source={{uri: `https://www.youtube.com/embed/${videoId}`}}
        />
      </View>
      <View>
        <Text style={styles.title} ellipsizeMode="tail" numberOfLines={2}>
          {title}
        </Text>
      </View>
      <View style={styles.channel} />
    </View>
  );
}

export default VideoPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 47 : 0, //StatusBar.currentHeight,
  },
  videoPlayerScreen: {
    width: '100%',
    height: 200,
  },
  title: {
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
    margin: 9,
  },
  channel: {
    borderBottomWidth: 1,
  },
});
