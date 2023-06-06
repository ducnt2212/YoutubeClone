import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View, Platform, Text, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import {useDispatch, useSelector} from 'react-redux';

function Header() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const currentTheme = useSelector(state => {
    return state.myDarkMode;
  });
  const {colors} = useTheme();
  const myColor = colors.iconColor;

  return (
    <View style={{marginTop: Platform.OS === 'ios' ? 47 : 0}}>
      <View
        style={[styles.headerContainer, {backgroundColor: colors.headerColor}]}>
        <StatusBar barStyle={currentTheme ? 'light-content' : 'dark-content'} />
        <View style={styles.logoContainer}>
          <Icon
            name="ios-logo-youtube"
            size={28}
            color="red"
            style={styles.logo}
          />
          <Text style={[styles.logoText, {color: myColor}]}>YouTube</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Icon name="md-videocam" size={32} color={myColor} />
          <Icon
            name="md-search"
            size={32}
            color={myColor}
            onPress={() => navigation.navigate('search')}
          />
          <MaterialIcon
            name="account-circle"
            size={32}
            color={myColor}
            onPress={() =>
              dispatch({type: 'change_theme', payload: !currentTheme})
            }
          />
        </View>
      </View>
    </View>
  );
}
export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    //marginTop: Platform.OS === 'ios' ? 47 : 0, //StatusBar.currentHeight,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    //For Android:
    elevation: 8,
    //For IOS:
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.26,
    //
  },
  logoContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  logo: {
    marginLeft: 20,
  },
  logoText: {
    fontSize: 22,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 150,
    margin: 5,
  },
});
