

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import io from 'socket.io-client'

import HomeScreen from './Components/Screens/HomeScreen'
import JoinScreen from './Components/Screens/JoinScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'


const appStack = createSwitchNavigator({


  JoinScreen: JoinScreen,
  HomeScreen: HomeScreen,

})

const AppContainer = createAppContainer(appStack)

const App = () => {



  return (
    <AppContainer />
  )


}



export default App;
