import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Number = props => {
    return (
        <View style={styles.summary}>
            <Text style={styles.number}>
                {props.children}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    summary: {
        borderWidth: 2,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'purple',
        padding: 10,
        width: 50,
        marginVertical: 10
    },
    number: {
        fontSize: 20,
        color: 'purple'
    }

});

export default Number;