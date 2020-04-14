import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

//import fonts from '../assets/fonts/fonts'
import MainButton from '../Components/MainButton';
import Color from '../constants/Color';
import Card from '../Components/Card';
import Input from '../Components/Input';
import Number from '../Components/Number';

const Startscreen = props => {
    const [enteredValue, setEnteredValue] = useState('')
    const [confirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()
    const [buttonlayout, setButtonLayout]=useState(Dimensions.get('window').width / 4)

    
    useEffect(()=>{
        const updateLayout=()=>{
            setButtonLayout(Dimensions.get('window').width / 4)
        }
        Dimensions.addEventListener('change', updateLayout);
        console.log('True')
        return()=>{
            Dimensions.removeEventListener('change',updateLayout)
            console.log('false')
        }
            
    })
    
    const inputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const confirmButton = () => {
        const checkNumber = parseInt(enteredValue)
        if (isNaN(checkNumber) || checkNumber <= 0 || checkNumber > 99) {
            Alert.alert('Invalid Number',
                'Number has to be in between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetButton }]
            )
            return;
        }
        setSelectedNumber('')
        setSelectedNumber(checkNumber)
        setConfirmed(true)
        Keyboard.dismiss()
    }

    const resetButton = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    let confirmedOutput
    if (confirmed) {
        confirmedOutput = <Card style={styles.numberContainer}><Text style={styles.innerText}>Your number is:</Text>
            <Number>{selectedNumber}</Number>
            <MainButton  onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
        </Card>


    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={30}>
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.myText}>
                    Input a number in this box
            </Text>
                <Card style={styles.inputContainer}>
                    <Input style={styles.input}
                        blurOnSubmit
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={inputHandler}
                        value={enteredValue}

                    />
                    <View style={styles.buttonContainer}>
                        <View style={{width:buttonlayout}}><Button title="Submit" color={Color.primary} onPress={confirmButton} /></View>
                        <View style={{width:buttonlayout}}><Button title="Reset" color={Color.secondary} onPress={resetButton} /></View>
                        
                    </View>
                </Card>
                {confirmedOutput}
            </View>
            
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 20,
        alignItems: "center"
    },
    myText: {
        fontSize: 20,
        marginVertical: 1,

    },

    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth:300,
        alignItems: 'center',
    },

    buttonContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
        width: 400,
        maxWidth: '80%',
        marginVertical: 15
    },
    button: {
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: "center"
    },
    numberContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: 130
    }

})

export default Startscreen;