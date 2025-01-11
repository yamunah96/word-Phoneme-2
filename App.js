import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import WordScreen from "./screens/wordscreen";
import PracticeScreen  from "./screens/practicescreen";

import BottomTabs from "./Navigations/BottomTabs";

import PhaseOne from "./components/phaseOne"
import PhaseTwo from "./components/phaseTwo"
import PhaseThree  from "./components/phaseThree";


import QuizPhaseOne from "./components/Quiz_Phase1"
import MatchingGame from "./components/matchingImage"
import SpellingGame  from "./components/spellingGame";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Phonic"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Phonic" component={BottomTabs} />
        <Stack.Screen name="Words" component={WordScreen} />
        <Stack.Screen name="Practice" component={PracticeScreen} />
        <Stack.Screen name="PhaseOne" component={PhaseOne} />
        <Stack.Screen name="PhaseTwo" component={PhaseTwo} />
        <Stack.Screen name="PhaseThree" component={PhaseThree} />
        <Stack.Screen name="QuizPhaseOne" component={QuizPhaseOne} />
        <Stack.Screen name="MatchingGame" component={MatchingGame}/>
        <Stack.Screen name="SpellingGame" component={SpellingGame}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

