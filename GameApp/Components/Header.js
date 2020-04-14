import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import Color from '../constants/Color';

const Header = prop => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>
                {prop.title}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Platform.OS==='android' ? Color.primary : 'white',
        paddingTop: 20
    },
    text: {
        fontSize: 30,
        fontStyle: 'italic',
        fontWeight: 'bold',
    }
})

export default Header;