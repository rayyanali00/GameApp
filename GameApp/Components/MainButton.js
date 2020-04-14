import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const MainButton = props =>{
    return(
    <TouchableOpacity onPress={props.onPress} >
        <View style={styles.button}>
            <Text style={styles.text}>{props.children}</Text>
        </View>
    </TouchableOpacity>
)}

const styles= StyleSheet.create({
    button:{
        backgroundColor: 'orange',
        //width: 100,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderRadius: 70
        
    },
    text:{
        color: 'white',
        alignContent: 'center',
        fontWeight: 'bold'

    }
});

export default MainButton;