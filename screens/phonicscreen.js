import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
// import { Icon, Header } from "@rneui/themed";
import db from "../localdb";
import PhonicSoundButton from "../components/PhonicSoundButton";
import database from "../config";
import { MaterialIcons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default class PhonicsScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      displayText: "",
      chunks: [],
      phonicSounds: [],
      word_firebase: [],
      displayIcons: false,
    };
  }

  toggleDisplayIcons = () => {
    this.setState({
      displayIcons: true,
    });
  };

  getDatabase = async () => {
    try {
      const wordsCollection = collection(database, "words"); // Firestore collection
      const wordsSnapshot = await getDocs(wordsCollection);
      const words = wordsSnapshot.docs.map((doc) => doc.data()); // Extract Firestore document data
      console.log("Fetched Words: ", words);

      // Store words in state
      this.setState({ word_firebase: words.map((word) => word.word) }); // Adjust key based on Firestore structure
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }
  };
  componentDidMount() {
    this.getDatabase();
  }

  updateDataabase = async (text) => {
    try {
      for (const word of this.state.word_firebase) {
        console.log(word);

        // Check if the word already exists in Firestore
        if (word.includes(text)) {
          console.log("The word already exists in the database.");
        } else {
          // Reference to the specific document in the "words" collection
          const docRef = doc(database, "words", "w1"); // Adjust "w1" to your actual document ID
          console.log("Document Reference: ", docRef);

          // Update the document with the new word
          await updateDoc(docRef, {
            word: arrayUnion(text), // Add the new word to the array
          });

          console.log(`The word "${text}" has been added to the database.`);
        }
      }
    } catch (error) {
      console.error("Error updating the database:", error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Word Phoneme App</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Words");
            }}
          >
            <MaterialIcons name="bookmark-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Image
          style={styles.imageIcon}
          source={{
            uri: "https://cdn0.iconfinder.com/data/icons/online-education-butterscotch-vol-2/512/Language_Learning-1024.png",
          }}
        />

        <TextInput
          style={styles.inputBox}
          placeholder="Search for a Word"
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
        />

        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            var word = this.state.text.toLowerCase().trim();

            db[word]
              ? (this.setState({ chunks: db[word].chunks }),
                this.setState({ phonicSounds: db[word].phones }),
                this.updateDataabase(word))
              : alert(
                  "The word does not exist in our database....YET! You can recommend a word to add here: https://forms.gle/J1WGHsxQSAsVXPoU6 ! Thank you and we are sorry for the inconvenience."
                );
          }}
        >
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>

        <View style={{ flex: 0.7, flexDirection: "row", flexWrap: "wrap" }}>
          {this.state.chunks.map((item, index) => {
            // console.log(index,item)
            return (
              <PhonicSoundButton
                key={index}
                wordChunk={item}
                soundChunk={this.state.phonicSounds[index]}
                buttonIndex={index}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
    padding: 16,
    backgroundColor: "#182854",
    
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign:"center",
    marginLeft:45
    
  },
  imageIcon: {
    width: 150,
    height: 150,
    alignSelf: "center",
  },
  inputBox: {
    marginTop: 7,
    width: "80%",
    alignSelf: "center",
    height: 50,
    textAlign: "center",
    borderWidth: 4,
    fontSize: 20,
    // outline: "none",
  },
  goButton: {
    width: "50%",
    height: 55,
    alignSelf: "center",
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
  },
  chunkButtonContainer: {
    flex: 0.5, // You can adjust this as per your design requirements
    backgroundColor: "yellow",
    flexDirection: "row", // Arrange the buttons in a row
    flexWrap: "wrap", // Allow buttons to wrap to the next line
    justifyContent: "flex-start", // Align the items to the start (left side)
    alignItems: "flex-start", // Align items to the top of the container
    padding: 10, // Add some padding inside the container
    margin: 10, // Add margin around the container
  },
});
//https://www.buzzphonics.com/
//https://github.com/hellodeborahuk/buzzphonics/blob/main/src/index.js
