import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './Components/Header';
import Startscreen from './Screen/Startscreen';
import GameScreen from './Screen/GameScreen';
import GameOver from './Screen/GameOver'


export default function app() {
  const [userNumber, setUserNumber] = useState();
  const [gRounds, setGRounds] = useState(0);

  const startGameHandler = selectedNumber => {
    setUserNumber(selectedNumber);
    setGRounds(0)
  }

  const gameOverHandler = nuOfRounds => {
    setGRounds(nuOfRounds)
  }
  const restartGame = () => {
    setGRounds(0)
    setUserNumber(null)
  }

  let content = <Startscreen onStartGame={startGameHandler} />
  
  if (userNumber && gRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  }
  else if (gRounds > 0) {
    content = <GameOver
      GameRounds={gRounds}
      userNumber={userNumber}
      onRestart={restartGame}
    />
  }
  return (
    <View style={styles.screen}>
      <Header title="Guess The Number" />
      {content}
    </View>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})