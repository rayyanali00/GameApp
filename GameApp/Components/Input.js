import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = props => {
    return (
        <TextInput {...props} style={{ ...styles.input, ...props.style }} />

    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginVertical: 10,
        fontSize: 18
    }
});

export default Input;