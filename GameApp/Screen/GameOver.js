import React from 'react';
import { View, Text, StyleSheet, Button, Image,ScrollView } from 'react-native';


const GameOver = props => {
    return (
        <ScrollView>
        <View style={styles.screen}>
            <Text style={styles.text}>
                The Game is Over
        </Text>
            <View style={styles.imageContainer}>
                <Image
                    //fadeDuration={100}
                     source={require('../assets/success.png')}
                    //source={{ uri: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?ixlib=rb-1.2.1&w=1000&q=80' }}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                    You guessed <Text style={styles.highlight}>{props.userNumber}</Text> in <Text style={styles.highlight}>{props.GameRounds}</Text> Rounds
                </Text>
                </View>
                <View>
            <Button title="Restart" onPress={props.onRestart} />
            </View>
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
    },
    imageContainer: {
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 3,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 25,
        fontStyle: 'italic'
    },
    resultText:{
        textAlign:'center',
        fontSize: 20,
        fontStyle: 'italic',
        marginVertical: 5
    },
    highlight:{
        fontWeight: 'bold',
        color: 'purple'
    }
})

export default GameOver;