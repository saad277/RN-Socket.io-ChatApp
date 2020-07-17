

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


const HomeScreen = () => {

    const [message, setMessage] = useState("")
    const [receivedMsg, setReceived] = useState([])

    const socket = useRef(null)

    useEffect(() => {

        socket.current = io("http://192.168.144.1:3001")

        socket.current.on("message", (message) => {


            console.log("received-->" + message)

            setReceived((prevState) => [...prevState, message]
            )
        })

    }, [])


    const sendMessage = () => {

        socket.current.emit("message", message)

        setMessage("")

    }

    const receivedMessages = receivedMsg.map((x) => {

        return (
            <Text>{x}</Text>
        )
    })
    return (
        <View style={styles.container}>

            {receivedMessages}

            <TextInput
                value={message}
                onChangeText={(text) => setMessage(text)}
                placeholder="Enter a chat message"
                onSubmitEditing={sendMessage}
            />
            <Button title="Send" onPress={sendMessage} />
        </View>
    )


}

const styles = StyleSheet.create({


    container: {

        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})


export default HomeScreen;
