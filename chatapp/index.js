

import React from 'react'

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

import Store from './Redux/Store'


import { Provider } from 'react-redux'



const App2 = () => {

    return (
        <Provider store={Store}  >
            <App />
        </Provider>
    )

}


AppRegistry.registerComponent(appName, () => App2);
