import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // For tab icons

import PhonicScreen from "../screens/phonicscreen";
import PracticeScreen from "../screens/practicescreen";
import DictionaryScreen from "../screens/dictionaryscreen";
import GameScreen from "../screens/gamescreen";
import ProfileScreen from "../screens/profilescreen";

const Tab = createBottomTabNavigator();

export default class BottomTabs extends React.Component {
  render() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown:false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Practice") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Dictionary") {
              iconName = focused ? "library" : "library-outline";
            } else if (route.name === "Game") {
              iconName = focused
                ? "game-controller"
                : "game-controller-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#182854",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={PhonicScreen} />
        <Tab.Screen name="Practice" component={PracticeScreen} />
        <Tab.Screen name="Dictionary" component={DictionaryScreen} />
        <Tab.Screen name="Game" component={GameScreen} />
        {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
      </Tab.Navigator>
    );
  }
}
