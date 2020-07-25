import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import Reducer from './Reducer'

const socket = io("http://192.168.144.1:3001")

const socketIoMiddleware = createSocketIoMiddleware(socket, "server/")


const store = applyMiddleware(socketIoMiddleware)(createStore)(Reducer)


store.subscribe(() => {

    console.log("new state", store.getState())
})




export default store;