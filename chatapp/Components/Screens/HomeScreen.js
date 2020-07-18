

import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Button
} from 'react-native';

import io from 'socket.io-client'

import { GiftedChat } from 'react-native-gifted-chat'


const HomeScreen = () => {


    const [receivedMsg, setReceived] = useState([])

    const socket = useRef(null)

    useEffect(() => {

        socket.current = io("http://192.168.144.1:3001")

        socket.current.on("message", (message) => {


            let sampleMessage = {

                _id: Math.random(),
                text: 'Hello developer',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },

            }

            sampleMessage.text = message

            console.log("received-->" + message)

            setReceived((prevState) => GiftedChat.append(prevState, sampleMessage)
            )
        })







    }, [])


    const onSend = (messages) => {

        socket.current.emit("message", messages[0].text)


        setReceived((prevState) => GiftedChat.append(prevState, messages))




    }



    return (

        <GiftedChat
            messages={receivedMsg}
            onSend={messages => onSend(messages)}
            user={{
                _id: 1,
            }}
        />


    )


}




export default HomeScreen;
