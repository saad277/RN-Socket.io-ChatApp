

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';



import HomeScreen from './Components/Screens/HomeScreen'
import JoinScreen from './Components/Screens/JoinScreen'
import FriendList from './Components/Screens/FriendListScreen'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'


const userStack = createStackNavigator({

  FriendList: FriendList,
  HomeScreen: HomeScreen,



})

const appStack = createSwitchNavigator({


  JoinScreen: JoinScreen,
  UserStack: userStack,

})

const AppContainer = createAppContainer(appStack)

const App = () => {



  return (
    
      <AppContainer />


  )


}



export default App;
