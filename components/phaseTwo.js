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
  jellyfish: require("../assets/images/jellyfish.png"),
  van: require("../assets/images/van.png"),
  web: require("../assets/images/web.png"),
  xmas: require("../assets/images/xmas.png"),
  yak: require("../assets/images/yak.png"),
  zebra: require("../assets/images/zebra.png"),
  zz: require("../assets/images/zz.png"),
  qu: require("../assets/images/bouquet.png"),
  ch: require("../assets/images/cheese.png"),
  sh: require("../assets/images/tshirt.png"),
  th: require("../assets/images/thumb.png"),
  ng: require("../assets/images/hang.png"),
  ai: require("../assets/images/mail.png"),
  bee: require("../assets/images/beee.png"),
  fight: require("../assets/images/fight.png"),
  soap: require("../assets/images/soap.png"),
  igloo: require("../assets/images/igloo.png"),
  spoon: require("../assets/images/spoon.png"),
  car: require("../assets/images/car.png"),
  doctor: require("../assets/images/doctor.png"),
  turtle: require("../assets/images/turtle.png"),
  owl: require("../assets/images/owl.png"),
  coin: require("../assets/images/coin.png"),
  ear: require("../assets/images/ear.png"),
  chair: require("../assets/images/chair.png"),
  vulture: require("../assets/images/vulture.png"),
  hammer: require("../assets/images/hammer.png"),
  ant: require("../assets/images/ant.png"),
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
  igloo: require("../assets/images/igloo.png"),
  king: require("../assets/images/king.png"),
  leaf: require("../assets/images/leaf.png"),
  map: require("../assets/images/map.png"),
  muffin: require("../assets/images/muffin.png"),
  net: require("../assets/images/net.png"),
  octopus: require("../assets/images/octopus.png"),
  penguin: require("../assets/images/penguin.png"),
  rat: require("../assets/images/rat.png"),
  sun: require("../assets/images/sun.png"),
  tap: require("../assets/images/tap.png"),
  umbrealla: require("../assets/images/umbrella.png"),
  // Add the rest of your images here...
};

const soundMap = {
  a: require("../assets/sounds/a.m4a"),
  ai: require("../assets/sounds/ai.m4a"),
  air: require("../assets/sounds/air.m4a"),
  ar: require("../assets/sounds/ar.m4a"),
  b: require("../assets/sounds/b.m4a"),
  c: require("../assets/sounds/c.m4a"),
  ch: require("../assets/sounds/ch.m4a"),
  d: require("../assets/sounds/d.m4a"),
  e: require("../assets/sounds/e.m4a"),
  ear: require("../assets/sounds/ear.m4a"),
  ee: require("../assets/sounds/ee.m4a"),
  f: require("../assets/sounds/f.m4a"),
  g: require("../assets/sounds/g.m4a"),
  h: require("../assets/sounds/h.m4a"),
  i: require("../assets/sounds/i.m4a"),
  igh: require("../assets/sounds/igh.m4a"),
  j: require("../assets/sounds/j.m4a"),
  l: require("../assets/sounds/l.m4a"),
  m: require("../assets/sounds/m.m4a"),
  n: require("../assets/sounds/n.m4a"),
  ng: require("../assets/sounds/ng.m4a"),
  o: require("../assets/sounds/o.m4a"),
  oa: require("../assets/sounds/oa.m4a"),
  oi: require("../assets/sounds/oi.m4a"),
  oo: require("../assets/sounds/oo.m4a"),
  ooo: require("../assets/sounds/ooo.m4a"),
  or: require("../assets/sounds/or.m4a"),
  ow: require("../assets/sounds/ow.m4a"),
  p: require("../assets/sounds/p.m4a"),
  qu: require("../assets/sounds/qu.m4a"),
  r: require("../assets/sounds/r.m4a"),
  s: require("../assets/sounds/s.m4a"),
  sh: require("../assets/sounds/sh.m4a"),
  t: require("../assets/sounds/t.m4a"),
  th: require("../assets/sounds/th.m4a"),
  u: require("../assets/sounds/u.m4a"),
  ur: require("../assets/sounds/ur.m4a"),
  ure: require("../assets/sounds/ure.m4a"),
  v: require("../assets/sounds/v.m4a"),
  w: require("../assets/sounds/w.m4a"),
  x: require("../assets/sounds/x.m4a"),
  y: require("../assets/sounds/y.m4a"),
  z: require("../assets/sounds/z.m4a"),
  er: require("../assets/sounds/er.m4a"),
};

const sounds = [
  { letter: "j", sound: "j", icon: "jellyfish" },
  { letter: "v", sound: "v", icon: "van" },
  { letter: "w", sound: "w", icon: "web" },
  { letter: "x", sound: "x", icon: "xmas" },
  { letter: "y", sound: "y", icon: "yak" },
  { letter: "z", sound: "z", icon: "zebra" },
  { letter: "zz", sound: "z", icon: "zz" },
  { letter: "qu", sound: "qu", icon: "qu" },
  { letter: "ch", sound: "ch", icon: "ch" },
  { letter: "sh", sound: "sh", icon: "sh" },
  { letter: "th", sound: "th", icon: "th" },
  { letter: "ng", sound: "ng", icon: "ng" },
  { letter: "ai", sound: "ai", icon: "ai" },
  { letter: "ee", sound: "ee", icon: "bee" },
  { letter: "igh", sound: "igh", icon: "fight" },
  { letter: "oa", sound: "oa", icon: "soap" },
  { letter: "oo", sound: "oo", icon: "igloo" },
  { letter: "oo", sound: "ooo", icon: "spoon" },
  { letter: "ar", sound: "ar", icon: "car" },
  { letter: "or", sound: "or", icon: "doctor" },
  { letter: "ur", sound: "ur", icon: "turtle" },
  { letter: "ow", sound: "ow", icon: "owl" },
  { letter: "oi", sound: "oi", icon: "coin" },
  { letter: "ear", sound: "ear", icon: "ear" },
  { letter: "air", sound: "air", icon: "chair" },
  { letter: "ure", sound: "ure", icon: "vulture" },
  { letter: "er", sound: "er", icon: "hammer" },
];

var alternatingColors = [
  "#f7bf31", // Pink
  "#11c684", // Green
  "#d4c44a", // Yellow
  "#0671d5", // Blue
  "#6cdfef", // Light Blue
  "#6b74e0", // Purple
];


export default class PhaseTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIcons: false,
    };
  }

  toggleDisplayIcons = () => {
    this.setState((prevState) => ({
      displayIcons: !prevState.displayIcons, // Toggle the current state
    }));
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
          <Text style={styles.title}>Phase Two</Text>
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
    flex:1,
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
