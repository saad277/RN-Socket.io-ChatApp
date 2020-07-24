import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    FlatList,
    Button
} from 'react-native';

import { connect } from 'react-redux'



const FriendList = (props) => {


    console.log(props.usersOnline)

    return (
        <View style={styles.container}>
            <FlatList
                data={props.usersOnline}
                renderItem={({ item }) => {

                    return <Text>{item.username}</Text>
                }}
                keyExtractor={(item) => item.username}
            />
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


const mapStateToProps = (state) => {

    return {

        usersOnline: state.usersOnline
    }

}

export default connect(mapStateToProps)(FriendList);