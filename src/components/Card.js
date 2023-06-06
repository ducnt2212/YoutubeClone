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
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

function Card(props) {
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
        <View style={styles.image_TitleContainer}>
          <MaterialIcon name="account-circle" size={40} color="#212121" />
          <View style={styles.titleContainer}>
            <Text
              style={[styles.title, {color: textColor}]}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {props.title}
            </Text>
            <Text style={{color: textColor}}>{props.channel}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Card;

const styles = StyleSheet.create({
  background: {
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  image_TitleContainer: {
    flexDirection: 'row',
    margin: 5,
  },
  titleContainer: {
    marginLeft: 6,
  },
  title: {
    fontSize: 20,
    width: Dimensions.get('screen').width - 50,
  },
});
