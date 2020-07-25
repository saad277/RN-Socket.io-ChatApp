

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

import { connect } from 'react-redux'



const HomeScreen = (props) => {

    const userId = props.navigation.getParam("userId")

    let messages = props.conversations[userId].messages

    return (

        <GiftedChat
            renderUsernameOnMessage={true}
            messages={[]}
            onSend={messages => {
                props.sendMessageLocally(messages, userId)

                props.sendMessageToServer(messages, userId)

            }}

            user={{
                _id: props.selfUser,
            }}
        />)




}


HomeScreen.navigationOptions = screenProps => {

    return {
        title: screenProps.navigation.getParam("name")
    }

};



const dispatchStateToProps = (dispatch) => {


    return {

        sendMessageLocally: (messages, userId) => {

            dispatch({

                type: "private_message",
                data: {
                    text: messages[0],
                    conversationId: userId
                }
            })
        },
        sendMessageToServer: (messages, userId) => {

            dispatch({

                type: "server/private_message",
                data: {
                    text: messages[0],
                    conversationId: userId
                }
            })

        }

    }
}


const mapStateToProps = (state) => {

    return {

        selfUser: state.selfUser,
        conversations: state.conversations
    }

}

export default connect(mapStateToProps, dispatchStateToProps)(HomeScreen);