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




const JoinScreen = ({ joinChat }) => {

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
            <Button title="Join" style={{ width: 30 }} onPress={() => joinChat(username)} />
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

export default JoinScreen;