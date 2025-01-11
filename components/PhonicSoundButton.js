import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Audio } from "expo-av";

export default class PhonicSoundButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressedButtonIndex: "",
    };
  }
  playSound = async (soundChunk) => {
    // console.log(soundChunk);
    var soundLink =
      "https://s3-whitehatjrcontent.whjr.online/phones/" + soundChunk + ".mp3";
    await Audio.Sound.createAsync(
      {
        uri: soundLink,
      },
      { shouldPlay: true }
    );
  };

  componentDidUpdate(prevProps) {
    // Reset the button color when a new word is searched
    if (prevProps.wordChunk !== this.props.wordChunk) {
      this.setState({ pressedButtonIndex: "" });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chunkcontainer}>
          <TouchableOpacity
            style={
              this.props.buttonIndex === this.state.pressedButtonIndex
                ? [styles.chunkButton, { backgroundColor: "green" }]
                : [styles.chunkButton, { backgroundColor: "red" }]
            }
            onPress={() => {
              this.setState({ pressedButtonIndex: this.props.buttonIndex });
              this.playSound(this.props.soundChunk);
            }}
          >
            <Text
              style={
                this.props.buttonIndex === this.state.pressedButtonIndex
                  ? [styles.displayText, { color: "white" }]
                  : [styles.displayText, { color: "white" }]
              }
            >
              {this.props.wordChunk}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  chunkcontainer: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 5,
    marginLeft: 60,
    flexGrow:1,
  },
  displayText: {
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  chunkButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 10,
    backgroundColor: "red",
    margin: 0,
  },
});
