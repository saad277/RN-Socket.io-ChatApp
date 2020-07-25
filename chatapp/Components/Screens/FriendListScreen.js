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
    Button,
    Image,
    TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux'



const FriendList = (props) => {


    console.log(props.usersOnline)

    return (

        <View style={styles.container}>
            <FlatList
                data={props.usersOnline}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity onPress={() => props.navigation.navigate("HomeScreen", { name: item.username, userId: item.userId })}>
                            <View style={styles.itemContainer}>
                                <Image
                                    style={styles.avatarContainer}
                                    source={{ uri: item.avatar }} />

                                <View style={styles.itemContaier}>
                                    <Text style={{ fontSize: 20 }}>{item.username}</Text>
                                </View>

                            </View>
                        </TouchableOpacity>
                    )
                }}
                keyExtractor={(item) => item.userId}
            />
        </View>

    )


}

const styles = StyleSheet.create({

    container: {
        flex: 1,

    },
    itemContainer: {
        flex: 1,
        flexDirection: "row"
    },
    avatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    itemContaier: {
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