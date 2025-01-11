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
  tray:require("../assets/images/phase3/tray.png"),
  cloud: require("../assets/images/phase3/cloud.png"),
  tie: require("../assets/images/phase3/tie.png"),
  beads: require("../assets/images/phase3/beads.png"),
  boy: require("../assets/images/phase3/boy.png"),
  bird: require("../assets/images/phase3/bird.png"),
  glue: require("../assets/images/phase3/glue.png"),
  queue: require("../assets/images/phase3/queue.png"),
  bone: require("../assets/images/phase3/bone.png"),
  wheel: require("../assets/images/phase3/wheel.png"),
  dolphin: require("../assets/images/phase3/dolphin.png"),
  screw: require("../assets/images/phase3/screw.png"),
  pew: require("../assets/images/phase3/pew.png"),
  toe: require("../assets/images/phase3/toe.png"),
  sauce: require("../assets/images/phase3/sauce.png"),
  toe: require("../assets/images/phase3/toe.png"),
  money: require("../assets/images/phase3/money.png"),
  cube: require("../assets/images/phase3/cube.png"),
  flute: require("../assets/images/phase3/flute.png"),
 
  // Add the rest of your images here...
};

const soundMap = {
  ay: require("../assets/sounds/Phase3/Ay.m4a"),
  ou: require("../assets/sounds/Phase3/Ou.m4a"),
  ie: require("../assets/sounds/Phase3/ie.m4a"),
  ea: require("../assets/sounds/Phase3/Ea.m4a"),
  oy: require("../assets/sounds/Phase3/Oy.m4a"),
  ir: require("../assets/sounds/Phase3/ir.m4a"),
  ue1: require("../assets/sounds/Phase3/Ue1.m4a"),
  ue2: require("../assets/sounds/Phase3/Ue2.m4a"),
  aw: require("../assets/sounds/Phase3/Aw.m4a"),
  wh: require("../assets/sounds/Phase3/Wh.m4a"),
  ph: require("../assets/sounds/Phase3/Ph.m4a"),
  ew1: require("../assets/sounds/Phase3/Ew1.m4a"),
  ew2: require("../assets/sounds/Phase3/Ew2.m4a"),
  oe: require("../assets/sounds/Phase3/Oe.m4a"),
  au: require("../assets/sounds/Phase3/Au.m4a"),
  ey: require("../assets/sounds/Phase3/Ey.m4a"),
  a_e: require("../assets/sounds/Phase3/a_e.m4a"),
  e_e: require("../assets/sounds/Phase3/e_e.m4a"),
  i_e: require("../assets/sounds/Phase3/I_E.m4a"),
  u_e1: require("../assets/sounds/Phase3/U_E1.m4a"),
  u_e2: require("../assets/sounds/Phase3/U_e2.m4a"),
  o_e: require("../assets/sounds/Phase3/O_E.m4a"),
};

const sounds = [
  { letter: "ay", sound: "ay", icon: "tray" },
  { letter: "ou", sound: "ou", icon: "cloud" },
  { letter: "ie", sound: "ie", icon: "tie" },
  { letter: "ea", sound: "ea", icon: "beads" },
  { letter: "oy", sound: "oy", icon: "boy" },
  { letter: "ir", sound: "ir", icon: "bird" },
  { letter: "ue", sound: "ue1", icon: "glue" },
  { letter: "ue", sound: "ue2", icon: "queue" },
  { letter: "aw", sound: "aw", icon: "bone" },
  { letter: "wh", sound: "wh", icon: "wheel" },
  { letter: "ph", sound: "ph", icon: "dolphin" },
  { letter: "ew", sound: "ew1", icon: "screw" },
  { letter: "ew", sound: "ew2", icon: "pew" },
  { letter: "oe", sound: "oe", icon: "toe" },
  { letter: "au", sound: "au", icon: "sauce" },
  { letter: "ey", sound: "ey", icon: "money" },
  { letter: "a-e", sound: "a_e", icon: "cube" },
  { letter: "e-e", sound: "e_e", icon: "flute" },
  { letter: "i-e", sound: "i_e", icon: "tie" },
  { letter: "o-e", sound: "o_e", icon: "toe" },
  { letter: "u-e", sound: "u_e2", icon: "glue" },
  { letter: "u-e", sound: "u_e1", icon: "cube" },
];

var alternatingColors = [
  "#f7bf31", // Pink
  "#11c684", // Green
  "#d4c44a", // Yellow
  "#0671d5", // Blue
  "#6cdfef", // Light Blue
  "#6b74e0", // Purple
];

export default class PhaseThree extends React.Component {
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
          <Text style={styles.title}>Phase Three</Text>
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
