import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons"; // Optional: For back arrow icon

const SpellingGame = () => {
  const navigation = useNavigation();

  const cardDeck = [
    {
      word: "cat",
      sounds: ["c", "a", "t"],
      icon: require("../assets/images/quiz-images/cat.png"),
    },
    {
      word: "map",
      sounds: ["m", "a", "p"],
      icon: require("../assets/images/quiz-images/map.png"),
    },
    {
      word: "bus",
      sounds: ["b", "u", "s"],
      icon: require("../assets/images/quiz-images/bus.png"),
    },
    {
      word: "duck",
      sounds: ["d", "u", "ck"],
      icon: require("../assets/images/quiz-images/duck.png"),
    },
    {
      word: "pen",
      sounds: ["p", "e", "n"],
      icon: require("../assets/images/quiz-images/pen.png"),
    },
    {
      word: "sun",
      sounds: ["s", "u", "n"],
      icon: require("../assets/images/quiz-images/sun.png"),
    },
    {
      word: "pig",
      sounds: ["p", "i", "g"],
      icon: require("../assets/images/quiz-images/pig.png"),
    },
    {
      word: "bat",
      sounds: ["b", "a", "t"],
      icon: require("../assets/images/quiz-images/bat.png"),
    },
    {
      word: "socks",
      sounds: ["s", "o", "ck", "s"],
      icon: require("../assets/images/quiz-images/socks.png"),
    },
    {
      word: "crab",
      sounds: ["c", "r", "a", "b"],
      icon: require("../assets/images/quiz-images/crab.png"),
    },
  ];

  const shuffleDeck = (input) => {
    const shuffledSounds = [...input.sounds];
    const allSounds = [
      "c",
      "a",
      "t",
      "m",
      "p",
      "u",
      "s",
      "g",
      "b",
      "e",
      "r",
      "n",
    ];
    while (shuffledSounds.length < 6) {
      const randomSound =
        allSounds[Math.floor(Math.random() * allSounds.length)];
      if (!shuffledSounds.includes(randomSound))
        shuffledSounds.push(randomSound);
    }
    shuffledSounds.sort(() => Math.random() - 0.5);

    return {
      word: input.word,
      sounds: input.sounds.map((sound) => ({ sound, found: false })),
      cards: shuffledSounds,
    };
  };

  const [deck, setDeck] = useState(cardDeck.map(shuffleDeck));
  const [currentCard, setCurrentCard] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [cantContinue, setCantContinue] = useState(true);
  const [displayEndPage, setDisplayEndPage] = useState(false);

  const handleCardClick = (sound) => {
    const current = deck[currentCard];
    const nextSound = current.sounds[currentPosition];

    if (nextSound.sound === sound) {
      deck[currentCard].sounds[currentPosition].found = true;
      setCurrentPosition(currentPosition + 1);
    }

    if (currentPosition >= current.sounds.length - 1) {
      setCantContinue(false);
    }
  };

  const handleNext = () => {
    if (currentCard < deck.length - 1) {
      setCurrentCard(currentCard + 1);
      setCurrentPosition(0);
      setCantContinue(true);
    } else {
      setDisplayEndPage(true);
    }
  };

  const newGame = () => {
    setDeck(cardDeck.map(shuffleDeck));
    setCurrentCard(0);
    setCurrentPosition(0);
    setCantContinue(true);
    setDisplayEndPage(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Spelling Game</Text>
      {displayEndPage ? (
        <View style={styles.endPage}>
          <Text style={styles.endText}>Well Done! 🎉</Text>
          <TouchableOpacity style={styles.button} onPress={newGame}>
            <Text style={styles.buttonText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToGamesButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToGamesText}>Back to Games</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.quizContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={cardDeck[currentCard].icon}
              //   source={{ uri: `..assets/images/quiz-images/${deck[currentCard].word}.png` }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.quizOptions}>
            {deck[currentCard].sounds.map((answer, index) => (
              <View style={styles.soundBox} key={`sound_${index}`}>
                <Text style={styles.soundText}>
                  {answer.found ? answer.sound : "_"}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.spellingOptions}>
            {deck[currentCard].cards.map((option, index) => (
              <TouchableOpacity
                style={styles.soundOption}
                key={`option_${index}`}
                onPress={() => handleCardClick(option)}
              >
                <Text style={styles.soundText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.nextButton, cantContinue && styles.disabledButton]}
            disabled={cantContinue}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
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
  quizContainer: {
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    backgroundColor: "#0f172a",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  quizOptions: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  spellingOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  soundBox: {
    backgroundColor: "#f472b6",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  soundOption: {
    backgroundColor: "#f472b6",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
  soundText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  nextButton: {
    backgroundColor: "#f8fafc",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: "#94a3b8",
  },
  nextButtonText: {
    color: "#1e293b",
    fontSize: 18,
    fontWeight: "bold",
  },
  endPage: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  endText: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  backToGamesButton: {
    backgroundColor: "#F43F5E",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  backToGamesText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SpellingGame;
