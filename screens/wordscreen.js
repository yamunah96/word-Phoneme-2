import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Icon, Header, ListItem } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";


import database from "../config";
import { collection, getDocs, doc, updateDoc, arrayUnion,deleteDoc, } from "firebase/firestore";
import { getAuth } from "firebase/auth";


export default class WordScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      pWord: [],
    };
  }
  getDatabase = async () => {
    try {
      const wordsCollection = collection(database, "words"); // Firestore collection
      const wordsSnapshot = await getDocs(wordsCollection);
      const words = wordsSnapshot.docs.map((doc) => doc.data()); // Extract Firestore document data
      // console.log("Fetched Words: ", words);

      // Store words in state
      this.setState({ pWord: words.map((word) => word.word) }); // Adjust key based on Firestore structure
    } catch (error) {
      console.error("Error fetching Firestore data:", error);
    }
  };

  componentDidMount() {
    this.getDatabase();
  }
  clearWords = async () => {
    try {
      // Get all words from Firestore
      const docId = "w1"; // Replace with your actual document ID

      // Reference to the specific document
      const docRef = doc(database, "words", docId);
      console.log("wordsDocs", docRef);

      // Clear the data in the 'word' field by setting it to an empty array
      await updateDoc(docRef, {
        word: [], // Set the 'word' field to an empty array
      });

      console.log(`Cleared data in 'word' field for document ID: ${docId}`);

      // Update the state to reflect the cleared field
      this.setState({ pWord: [] });

      alert(
        `The 'word' field in document ID '${docId}' has been cleared successfully.`
      );
    } catch (error) {
      console.error("Error clearing words from Firestore:", error);
      alert("Failed to clear words. Please try again.");
    }
  };
  render() {
    // console.log("words",this.state.pWord[0])
    // Calculate dynamic font size based on the number of words

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Word Phoneme App</Text>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("Phonic");
            }}
          >
            <MaterialIcons name="arrow-back" size={25} color="white" />
          </TouchableOpacity>
        </View>


        <Image
          style={styles.imageIcon}
          source={{
            uri: "https://cdn0.iconfinder.com/data/icons/online-education-butterscotch-vol-2/512/Language_Learning-1024.png",
          }}
        />

        {this.state.pWord.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 30,
              }}
            >
              Loading...
            </Text>
          </View>
        ) : (
          <ScrollView style={styles.scrollView}>
            {this.state.pWord[0].map((item, index) => {
              // Assuming each item is a word
              // console.log(words)
              return (
                <View key={index} style={styles.wordContainer}>
                  <Text style={styles.wordText}>{item}</Text>
                </View>
              );
            })}
          </ScrollView>
        )}

        <TouchableOpacity style={styles.clearButton} onPress={this.clearWords}>
          <Text style={styles.clearButtonText}>Clear All Words</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#b8b8b8",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  container2: {
    flex: 1,
  },
  text: {
    color: "red",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    paddingTop: 20,
  },

  practicedWord: {
    textAlign: "center",
    fontSize: 30,
  },

  clearButton: {
    backgroundColor: "#FF6347", // Tomato color
    padding: 15,
    marginTop: 20,
    borderRadius: 10,
    alignItems: "center",
  },

  clearButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },

  wordContainer: {
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  wordText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});
