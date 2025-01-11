import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Optional: For back arrow icon

const MatchingGame = ({ navigation }) => {
  const sounds = [
    { id: 1, letter: "h", icon: require("../assets/images/hat.png") },
    { id: 2, letter: "f", icon: require("../assets/images/frog.png") },
    { id: 3, letter: "g", icon: require("../assets/images/guitar.png") },
    { id: 4, letter: "c", icon: require("../assets/images/cat.png") },
    { id: 5, letter: "t", icon: require("../assets/images/tap.png") },
    { id: 6, letter: "s", icon: require("../assets/images/sun.png") },
    { id: 7, letter: "p", icon: require("../assets/images/penguin.png") },
    { id: 8, letter: "u", icon: require("../assets/images/umbrella.png") },
    { id: 9, letter: "b", icon: require("../assets/images/bin.png") },
    { id: 10, letter: "e", icon: require("../assets/images/egg.png") },
    { id: 11, letter: "r", icon: require("../assets/images/rat.png") },
    { id: 12, letter: "a", icon: require("../assets/images/ant.png") },
  ];

  function shuffleCards() {
    const shuffledDeck = sounds.sort(() => Math.random() - 0.5).slice(0, 6);

    return [
      ...shuffledDeck.map((sound) => ({ id: sound.id, letter: sound.letter })),
      ...shuffledDeck.map((sound) => ({ id: sound.id, icon: sound.icon })),
    ].sort(() => Math.random() - 0.5);
  }

  const [openedCard, setOpenedCard] = useState([]);
  const [matched, setMatched] = useState([]);
  const [finished, setFinished] = useState(false);
  const [pairOfSounds, setPairOfSounds] = useState(shuffleCards);

  function newGame() {
    setOpenedCard([]);
    setMatched([]);
    setFinished(false);
    setPairOfSounds(shuffleCards());
  }

  function flipCard(index) {
    setOpenedCard((opened) => {
      if (opened.length === 2) return opened;

      const updatedOpened = [...opened, index];

      if (updatedOpened.length === 2) {
        const firstMatched = pairOfSounds[updatedOpened[0]];
        const secondMatched = pairOfSounds[updatedOpened[1]];

        if (firstMatched.id === secondMatched.id) {
          setMatched([...matched, firstMatched.id]);
        }

        setTimeout(() => setOpenedCard([]), 1000);

        if (matched.length + 1 === 6) {
          setFinished(true);
        }
      }

      return updatedOpened;
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Macthing Sound</Text>

      <FlatList
        data={pairOfSounds}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item, index }) => {
          const isFlipped =
            openedCard.includes(index) || matched.includes(item.id);

          return (
            <TouchableOpacity
              style={[styles.card, isFlipped ? styles.flipped : null]}
              onPress={() => flipCard(index)}
              disabled={isFlipped}
            >
              {isFlipped ? (
                item.letter ? (
                  <Text style={styles.cardText}>{item.letter}</Text>
                ) : (
                  <Image source={item.icon} style={styles.icon} />
                )
              ) : (
                <View style={styles.cardBack} />
              )}
            </TouchableOpacity>
          );
        }}
      />
      {finished && (
        <View style={styles.overlay}>
          <Text style={styles.finishedText}>Well Done! 🎉</Text>
          <TouchableOpacity style={styles.button} onPress={newGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Back to Games</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default MatchingGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a2948", // Dark blue background
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  header: {
    fontSize: 28,
    color: "#FFF",
    fontWeight: "bold",
    marginVertical: 20,
  },
  card: {
    width: 80,
    height: 100,
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF66B3", // Pink card background
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },
  cardBack: {
    width: "100%",
    height: "100%",
    backgroundColor: "#FF66B3", // Same pink color for the back
    borderRadius: 8,
  },
  flipped: {
    backgroundColor: "#6cdfef", // White background for flipped cards
  },
  cardText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    width: 60,
    height: 60,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  finishedText: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#0066CC",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    width: "60%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
