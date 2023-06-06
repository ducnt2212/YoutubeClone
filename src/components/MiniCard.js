import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

function MiniCard(props) {
  const navigation = useNavigation();

  const {colors} = useTheme();
  const textColor = colors.iconColor;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('videoPlayer', {
          videoId: props.videoId,
          title: props.title,
        })
      }>
      <View style={styles.background}>
        <Image
          source={{
            uri: `https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`,
          }}
          style={styles.image}
        />
        <View style={styles.titleContainer}>
          <Text
            style={[styles.title, {color: textColor}]}
            ellipsizeMode="tail"
            numberOfLines={3}>
            {props.title}
          </Text>
          <Text style={[styles.subTitle, {color: textColor}]}>
            {props.channel}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default MiniCard;

const styles = StyleSheet.create({
  background: {
    flexDirection: 'row',
    margin: 10,
    marginBottom: 0,
  },
  image: {
    width: '45%',
    height: 100,
  },
  titleContainer: {
    paddingLeft: 7,
  },
  title: {
    fontSize: 17,
    width: Dimensions.get('screen').width / 2,
  },
  subTitle: {
    fontSize: 12,
  },
});
