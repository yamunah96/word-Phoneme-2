import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default class GameScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/bee.png")} // Replace with your logo path
          style={styles.logo}
        />
        <Text style={styles.greeting}>Good afternoon!</Text>

        {/* Phase Buttons */}
        <TouchableOpacity
          style={[styles.phaseButton, styles.phaseOne]}
          onPress={() => {
            this.props.navigation.navigate("QuizPhaseOne");
          }}
        >
          <Text style={styles.phaseSubtitle}>  Phase 1</Text>
          <Text style={styles.phaseTitle}>Quiz</Text>
          
          <Image
            source={require("../assets/images/king.png")} // Replace with your bird icon path
            style={styles.icon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.phaseButton, styles.phaseOne]}
          onPress={() => {
            this.props.navigation.navigate("MatchingGame");
          }}
        >
         <Text style={styles.phaseSubtitle}>Phase 2</Text>
          <Text style={styles.phaseTitle}>  Matching sounds</Text>
        
          <Image
            source={require("../assets/images/king.png")} // Replace with your bird icon path
            style={styles.icon}
          />
        </TouchableOpacity>
        

        <TouchableOpacity
          style={[styles.phaseButton, styles.phaseOne]}
          onPress={() => {
            this.props.navigation.navigate("SpellingGame");
          }}
        >
         <Text style={styles.phaseSubtitle}>Phase 3</Text>
          <Text style={styles.phaseTitle}> Spelling Game</Text>
        
          <Image
            source={require("../assets/images/king.png")} // Replace with your bird icon path
            style={styles.icon}
          />
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A2540",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 40,
    resizeMode: "contain",
  },
  greeting: {
    color: "#FFF",
    fontSize: 18,
    marginTop: 10,
  },
  phaseButton: {
    width: "90%",
    height: 80,
    borderRadius: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  phaseOne: {
    backgroundColor: "#7A5AC8", // Purple
  },
  phaseThree: {
    backgroundColor: "#23C4A6", // Green
  },
  phaseFive: {
    backgroundColor: "#286FB4", // Blue
  },
  games: {
    backgroundColor: "#F98BBE", // Pink
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
  },
  phaseSubtitle: {
    fontSize: 20,
    color: "#FFF",
    textAlign:"center"
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  hexagon: {
    width: 50,
    height: 50,
    backgroundColor: "#FEC73E", // Yellow
    transform: [{ rotate: "45deg" }],
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  hexagonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 18,
    transform: [{ rotate: "-45deg" }],
  },
});
