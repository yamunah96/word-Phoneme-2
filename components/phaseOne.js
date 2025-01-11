import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
const imageMap = {
  sun: require("../assets/images/sun.png"),
  ant: require("../assets/images/ant.png"),
  tap: require("../assets/images/tap.png"),
  penguin: require("../assets/images/penguin.png"),
  igloo: require("../assets/images/igloo.png"),
  net: require("../assets/images/net.png"),
  map: require("../assets/images/map.png"),
  muffin: require("../assets/images/muffin.png"),
  bee: require("../assets/images/bee.png"),
  bell: require("../assets/images/bell.png"),
  bin: require("../assets/images/bin.png"),
  blob: require("../assets/images/blob.svg"),
  cat: require("../assets/images/cat.png"),
  dog: require("../assets/images/dog.png"),
  dress: require("../assets/images/dress.png"),
  duck: require("../assets/images/duck.png"),
  egg: require("../assets/images/egg.png"),
  frog: require("../assets/images/frog.png"),
  guitar: require("../assets/images/guitar.png"),
  hat: require("../assets/images/hat.png"),
  jellyfish: require("../assets/images/jellyfish.png"),
  king: require("../assets/images/king.png"),
  leaf: require("../assets/images/leaf.png"),
  ring: require("../assets/images/ring.png"),
  octopus: require("../assets/images/octopus.png"),
  rat: require("../assets/images/rat.png"),
  umbrella: require("../assets/images/umbrella.png"),
  // Add the rest of your images here...
};

const soundMap = {
  s: require("../assets/sounds/s.m4a"),
  a: require("../assets/sounds/a.m4a"),
  t: require("../assets/sounds/t.m4a"),
  p: require("../assets/sounds/p.m4a"),
  i: require("../assets/sounds/i.m4a"),
  n: require("../assets/sounds/n.m4a"),
  m: require("../assets/sounds/m.m4a"),
  d: require("../assets/sounds/d.m4a"),
  g: require("../assets/sounds/g.m4a"),
  o: require("../assets/sounds/o.m4a"),
  c: require("../assets/sounds/c.m4a"),
  e: require("../assets/sounds/e.m4a"),
  u: require("../assets/sounds/u.m4a"),
  r: require("../assets/sounds/r.m4a"),
  h: require("../assets/sounds/h.m4a"),
  b: require("../assets/sounds/b.m4a"),
  f: require("../assets/sounds/f.m4a"),
  l: require("../assets/sounds/l.m4a"),
  s: require("../assets/sounds/s.m4a"),
};

const sounds = [
  { letter: "s", sound: "s", icon: "sun" },
  { letter: "a", sound: "a", icon: "ant" },
  { letter: "t", sound: "t", icon: "tap" },
  { letter: "p", sound: "p", icon: "penguin" },
  { letter: "i", sound: "i", icon: "igloo" },
  { letter: "n", sound: "n", icon: "net" },
  { letter: "m", sound: "m", icon: "map" },
  { letter: "d", sound: "d", icon: "dog" },
  { letter: "g", sound: "g", icon: "guitar" },
  { letter: "o", sound: "o", icon: "octopus" },
  { letter: "c", sound: "c", icon: "cat" },
  { letter: "k", sound: "c", icon: "king" },
  { letter: "ck", sound: "c", icon: "duck" },
  { letter: "e", sound: "e", icon: "egg" },
  { letter: "u", sound: "u", icon: "umbrella" },
  { letter: "r", sound: "r", icon: "rat" },
  { letter: "h", sound: "h", icon: "hat" },
  { letter: "b", sound: "b", icon: "bin" },
  { letter: "f", sound: "f", icon: "frog" },
  { letter: "ff", sound: "f", icon: "muffin" },
  { letter: "l", sound: "l", icon: "leaf" },
  { letter: "ll", sound: "l", icon: "bell" },
  { letter: "ss", sound: "s", icon: "dress" },
];

var alternatingColors = [
  "#f7bf31", // Pink
  "#11c684", // Green
  "#d4c44a", // Yellow
  "#0671d5", // Blue
  "#6cdfef", // Light Blue
  "#6b74e0", // Purple
];

export default class PhaseOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIcons: false,
    };
  }

  toggleDisplayIcons = () => {
    this.setState({
      displayIcons: !this.state.displayIcons,
    });
  };

  playSound = async (soundKey) => {
    const soundPath = soundMap[soundKey];
    if (!soundPath) {
      Alert.alert("Error", "Sound not found. Check your sound map.");
      return;
    }
    try {
      const { sound: audio } = await Audio.Sound.createAsync(soundPath);
      await audio.playAsync();
    } catch (error) {
      Alert.alert("Error", "Unable to play the sound.");
      console.error(error);
    }
  };

  renderSound = ({ item, index }) => {
    const randomColor =
      alternatingColors[Math.floor(Math.random() * alternatingColors.length)];
    const imageSource = imageMap[item.icon]; // Get the correct image source
    return (
      <TouchableOpacity
        style={[styles.soundItem, { backgroundColor: randomColor }]}
        onPress={() => this.playSound(item.sound)}
      >
        {this.state.displayIcons ? (
          <>
            <Image
              source={imageSource} // Ensure you place images here
              style={styles.icon}
            />
            <Text style={styles.iconName}>{item.icon}</Text>
          </>
        ) : (
          <Text style={styles.letter}>{item.letter}</Text>
        )}
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.goBack();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Phase One</Text>
          <TouchableOpacity
            onPress={() => {
              this.toggleDisplayIcons();
            }}
          >
            <MaterialIcons name="flip-camera-android" size={30} color="white" />
          </TouchableOpacity>
        </View>

        {/* Sound Grid */}
        <FlatList
          data={sounds}
          renderItem={this.renderSound}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.soundGrid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1f354b",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#182854",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  soundGrid: {
    padding: 16,
  },
  soundItem: {
    flex: 1,
    margin: 8,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  letter: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});
