import React from 'react';
//import {View, Platform} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './src/screens/Home';
import SearchScreen from './src/screens/Search';
import VideoPlayerScreen from './src/screens/VideoPlayer';
import ExploreScreen from './src/screens/Explore';
import SubcribeScreen from './src/screens/Subcribe';
import reducer from './src/reducers/reducer';
import themeReducer from './src/reducers/themeReducer';

import {Provider, useSelector} from 'react-redux';
//import {configureStore} from '@reduxjs/toolkit'; //alternative to `import {createStore} from 'redux'`
import {legacy_createStore as createStore} from '@reduxjs/toolkit';
import {combineReducers} from '@reduxjs/toolkit';

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    headerColor: '#404040',
    iconColor: 'white',
    tabIcon: 'white',
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    headerColor: 'white',
    iconColor: 'black',
    tabIcon: 'red',
  },
};

const rootReducer = combineReducers({
  cardData: reducer,
  myDarkMode: themeReducer,
});
const store = createStore(rootReducer);

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function RootHomeTabs() {
  const {colors} = useTheme();

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => {
          let iconName = '';

          if (route.name === 'home') {
            iconName = 'home';
          } else if (route.name === 'explore') {
            iconName = 'explore';
          } else if (route.name === 'subscribe') {
            iconName = 'subscriptions';
          }
          return <Icon name={iconName} size={32} color={color} />;
        },
        tabBarActiveTintColor: colors.tabIcon,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tabs.Screen name="home" component={HomeScreen} />
      <Tabs.Screen name="explore" component={ExploreScreen} />
      <Tabs.Screen name="subscribe" component={SubcribeScreen} />
    </Tabs.Navigator>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

function Navigation() {
  let currentTheme = useSelector(state => {
    return state.myDarkMode;
  });

  return (
    <NavigationContainer
      theme={currentTheme ? customDarkTheme : customDefaultTheme}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="rootHome" component={RootHomeTabs} />
        <Stack.Screen name="search" component={SearchScreen} />
        <Stack.Screen name="videoPlayer" component={VideoPlayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
