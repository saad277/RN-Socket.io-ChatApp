

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

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

const socket = io("http://192.168.144.1:3001")

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

const reducer = (state = {}, action) => {

  switch (action.type) {

    case "message":
      return { ...state, message: action.data }

    default:
      return state;
  }


}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)

store.subscribe(() => {

  console.log("new state", store.getState())
})

store.dispatch({type:'server/hello', data:'Hello!'});

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
