import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Use navigation in React Native
import { Ionicons } from "@expo/vector-icons"; // Optional: For back arrow icon
import { MaterialIcons } from "@expo/vector-icons";
const shuffleSounds = () => {
  return [
    {
      id: 0,
      image: require("../assets/images/quiz-images/duck.png"),
      alt: "duck",
      answerOptions: [
        { answerText: "d", isCorrect: true },
        { answerText: "f", isCorrect: false },
        { answerText: "ck", isCorrect: false },
      ],
    },
    {
      id: 1,
      image: require("../assets/images/quiz-images/king.png"),
      alt: "king",
      answerOptions: [
        { answerText: "k", isCorrect: true },
        { answerText: "h", isCorrect: false },
        { answerText: "ck", isCorrect: false },
      ],
    },
    {
      id: 2,
      image: require("../assets/images/quiz-images/umbrella.png"),
      alt: "umbrella",
      answerOptions: [
        { answerText: "a", isCorrect: false },
        { answerText: "u", isCorrect: true },
        { answerText: "b", isCorrect: false },
      ],
    },
    {
      id: 3,
      image: require("../assets/images/quiz-images/igloo.png"),
      alt: "igloo",
      answerOptions: [
        { answerText: "p", isCorrect: false },
        { answerText: "m", isCorrect: false },
        { answerText: "i", isCorrect: true },
      ],
    },
    {
      id: 4,
      image: require("../assets/images/quiz-images/leaf.png"),
      alt: "leaf",
      answerOptions: [
        { answerText: "l", isCorrect: true },
        { answerText: "n", isCorrect: false },
        { answerText: "e", isCorrect: false },
      ],
    },
    {
      id: 5,
      image: require("../assets/images/quiz-images/map.png"),
      alt: "map",
      answerOptions: [
        { answerText: "t", isCorrect: false },
        { answerText: "m", isCorrect: true },
        { answerText: "p", isCorrect: false },
      ],
    },
    {
      id: 6,
      image: require("../assets/images/quiz-images/octopus.png"),
      alt: "octopus",
      answerOptions: [
        { answerText: "o", isCorrect: true },
        { answerText: "b", isCorrect: false },
        { answerText: "d", isCorrect: false },
      ],
    },
    {
      id: 7,
      image: require("../assets/images/quiz-images/bus.png"),
      alt: "bus",
      answerOptions: [
        { answerText: "s", isCorrect: false },
        { answerText: "f", isCorrect: false },
        { answerText: "b", isCorrect: true },
      ],
    },
    {
      id: 8,
      image: require("../assets/images/quiz-images/pig.png"),
      alt: "pig",
      answerOptions: [
        { answerText: "t", isCorrect: false },
        { answerText: "g", isCorrect: false },
        { answerText: "p", isCorrect: true },
      ],
    },
    {
      id: 9,
      iimage: require("../assets/images/quiz-images/socks.png"),
      alt: "socks",
      answerOptions: [
        { answerText: "s", isCorrect: true },
        { answerText: "k", isCorrect: false },
        { answerText: "o", isCorrect: false },
      ],
    },
  ]
    .sort(() => Math.random() - 0.5)
    .slice(0, 5);
};
const QuizPhaseOne = () => {
  const navigation = useNavigation();
  const [quizQuestions, setQuizQuestions] = useState(shuffleSounds());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [displayEndPage, setDisplayEndPage] = useState(false);
  const [answered, setAnswered] = useState("");
  const [cantContinue, setCantContinue] = useState(true);

  const newGame = () => {
    setDisplayEndPage(false);
    setCurrentQuestion(0);
    setQuizQuestions(shuffleSounds());
  };

  const handleNextBtnClick = () => {
    setAnswered("");
    setCantContinue(true);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setDisplayEndPage(true);
    }
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setCantContinue(false);
      setAnswered("Correct ✅");
    } else {
      setAnswered("Try again ❌");
      setTimeout(() => {
        setAnswered("");
      }, 800);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={32} color="white" />
      </TouchableOpacity>

      <Text style={styles.header}>Phase One Quiz</Text>

      {displayEndPage ? (
        <View style={styles.endPage}>
          <Text style={styles.endText}>Well Done! 🎉</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={newGame}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backToGamesButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backToGamesText}>Back to Games</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <Image
            source={quizQuestions[currentQuestion].image}
            style={styles.quizImage}
          />
          <View style={styles.answerContainer}>
            {quizQuestions[currentQuestion].answerOptions.map(
              (answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.answerButton}
                  onPress={() => handleAnswer(answer.isCorrect)}
                >
                  <Text style={styles.answerText}>{answer.answerText}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
          <Text
            style={{
              ...styles.feedbackText,
              color: answered === "Correct ✅" ? "#4CAF50" : "#FF5252",
            }}
          >
            {answered}
          </Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextBtnClick}
            disabled={cantContinue}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E293B",
    alignItems: "center",
    padding: 20,
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
  quizImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  answerContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  answerButton: {
    backgroundColor: "#3B82F6",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    width: "80%",
    alignItems: "center",
  },
  answerText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  feedbackText: {
    fontSize: 20,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: "#10B981",
    padding: 15,
    borderRadius: 10,
    width: "60%",
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  endPage: {
    alignItems: "center",
  },
  endText: {
    fontSize: 30,
    color: "#FFF",
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: "#2563EB",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: "80%",
    alignItems: "center",
  },
  playAgainText: {
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

export default QuizPhaseOne;
