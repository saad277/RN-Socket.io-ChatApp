

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

import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import { Provider } from 'react-redux'

const socket = io("http://192.168.144.1:3001")

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/")

const reducer = (state = {}, action) => {

  switch (action.type) {

    case "message":
      return { ...state, message: action.data }

    case "users_online":
      return {
        ...state,
        usersOnline: action.data
      }

    default:
      return state;
  }


}

const store = applyMiddleware(socketIoMiddleware)(createStore)(reducer)

store.subscribe(() => {

  console.log("new state", store.getState())
})

store.dispatch({ type: 'server/hello', data: 'Hello!' });


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
    <Provider store={store} >
      <AppContainer />
    </Provider>

  )


}



export default App;
