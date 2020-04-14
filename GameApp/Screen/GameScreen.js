import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert,ScrollView, Dimensions } from 'react-native';
import Number from '../Components/Number';
import Card from '../Components/Card';
//import GameOver from './GameOver';
import MainButton from '../Components/MainButton';
import Icon from 'react-native-vector-icons/dist/FontAwesome'

const generateNum = (max, min, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor(Math.random() * (max - min)) + min
    if (rndNumber === exclude) {
        return generateNum(max, min, exclude)
    }
    else {
        return rndNumber
    }
}

const renderListItem = (value, noOfRounds)=>( 
    <View style={styles.listItem} key={value}>
        <Text style={styles.listText}>#{noOfRounds}</Text>
        <Text style={styles.listText}>{value}</Text>
        </View>
)

const GameScreen = props => {
    const initial=generateNum(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initial)
    const [adjustWidth,setAdjustWidth]=useState(Dimensions.get('window').width)
    const [adjustHeight,setAdjustHeight]=useState(Dimensions.get('window').height)
    const currentLow = useRef(1);
    const currentHigh = useRef(100);
    const [pastGuess, setPastGuess] = useState([initial]);
    const { onGameOver, userChoice } = props;

    useEffect(()=>{
        const changeLayout=()=>{
            setAdjustWidth(Dimensions.get('window').width);
            setAdjustHeight(Dimensions.get('window').height)
        };
        Dimensions.addEventListener('change', changeLayout);
        return()=>{
            Dimensions.removeEventListener('change',changeLayout)
        };
    })

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuess.length)
        }
    }, [currentGuess, onGameOver, userChoice])

    const nextGuess = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Do not Cheat', 'Play fair', [{ text: 'Okay Sorry', style: 'cancel' }])
            return;
        }
        if (direction === "lower") {
            currentHigh.current = currentGuess;
        }
        else {
            currentLow.current = currentGuess + 1;
        }
        const nextNum = generateNum(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNum)
        //setRounds(curRounds => curRounds + 1)
        setPastGuess(guess=>[nextNum,...guess])
    }
    let listContainer = styles.list;
    if(adjustWidth < 350){
        listContainer=styles.listContainerBig;
    }
        if(adjustHeight<500){
            return(
                <View style={styles.screen}>
                <Text>Opponent's Guess</Text>
                <View style={styles.control}>
                <MainButton  onPress={nextGuess.bind(this, 'lower')}>
                        <Icon name="minus" size={25} color="white"/>
                    </MainButton>
                <Number>{currentGuess}</Number>
                    <MainButton title='Greater' onPress={nextGuess.bind(this, 'greater')}>
                        <Icon name="plus" size={25} color="white"/>
                    </MainButton>
                    </View>
                <View style={styles.list}>
                <ScrollView contentContainerStyle={styles.listContent}>
                {pastGuess.map((guessNum,index)=>renderListItem(guessNum, pastGuess.length-index))}
                </ScrollView>
                </View>
            </View>        
            )
        }


    return (
        <View style={styles.screen}>
            <Text>Opponent's Guess</Text>
            <Number>{currentGuess}</Number>
            <Card style={styles.buttonContainer}>
                <MainButton  onPress={nextGuess.bind(this, 'lower')}>
                    <Icon name="minus" size={25} color="white"/>
                </MainButton>
                <MainButton title='Greater' onPress={nextGuess.bind(this, 'greater')}>
                    <Icon name="plus" size={25} color="white"/>
                </MainButton>
            </Card>
            <View style={styles.list}>
            <ScrollView contentContainerStyle={styles.listContent}>
            {pastGuess.map((guessNum,index)=>renderListItem(guessNum, pastGuess.length-index))}
            </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 30,
        alignItems: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: 300,
        maxWidth: '80%',
        marginTop: Dimensions.get('window').height > 600 ? 30 : 5    
    },
    listItem:{
        borderWidth: 1,
        padding: 10,
        marginVertical: 20,
        borderColor: 'black',
        backgroundColor:'white',
        flexDirection: 'row',
        justifyContent:'space-between'
    },
    list:{
        width: '60%',
        flex:1
        
    },
    listContainerBig:{
        flex: 1,
        width: '80%',
    },
    listContent:{
        flexGrow: 1,
        justifyContent: 'flex-end'
    },
    control:{
        //flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '60%'
    }
    // listText:{
    //     fontSize: 20,
    //     color: 'purple',
    //     fontWeight:'bold'
    // }

})

export default GameScreen;