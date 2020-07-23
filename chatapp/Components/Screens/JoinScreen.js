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

import { connect } from 'react-redux'


const JoinScreen = (props) => {

    const [username, setUsername] = useState("")



    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 30 }}>Chat App</Text>
            <TextInput
                placeholder="Enter User name "
                style={{ fontSize: 30, textAlign: "center" }}
                onChangeText={(text) => setUsername(text)}
                value={username}
            />
            <Button title="Join" style={{ width: 30 }} 
            onPress={() => { 
                props.joinChat(username) 
                props.navigation.navigate("UserStack")
                }} />
        </View>
    )



}


const styles = StyleSheet.create({


    container: {

        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        justifyContent: "space-around"
    }

})


const dispatchStateToProps = (dispatch) => {

    return {

        joinChat: (username) => {

            dispatch({

                type: "server/join",
                data: username
            })

        }
    }

}

export default connect(null, dispatchStateToProps)(JoinScreen);