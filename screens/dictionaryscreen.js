import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
export default class DictionaryScreennpm  extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchPressed: false,
      isLoading: false,
      word: 'Loading...',
      lexicalCategory: '',
      definition: '',
    };
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';

    return fetch(url)
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((response) => {
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];

          var definition = wordData.description;
          var lexicalCategory = wordData.wordtype;

          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        } else {
          this.setState({
            word: this.state.text,
            definition: 'Not Found',
          });
        }
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputBoxContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="Enter a word"
            placeholderTextColor="#ccc"
            onChangeText={(text) => {
              this.setState({
                text: text,
                isSearchPressed: false,
                word: 'Loading...',
                lexicalCategory: '',
                examples: [],
                definition: '',
              });
            }}
            value={this.state.text}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ isSearchPressed: true });
              this.getWord(this.state.text);
            }}
          >
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.outputContainer}>
          <Text style={styles.loadingText}>
            {this.state.isSearchPressed && this.state.word === 'Loading...'
              ? this.state.word
              : ''}
          </Text>
          {this.state.word !== 'Loading...' ? (
            <View style={styles.resultContainer}>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Word: </Text>
                <Text style={styles.detailsContent}>{this.state.word}</Text>
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.detailsTitle}>Type: </Text>
                <Text style={styles.detailsContent}>
                  {this.state.lexicalCategory}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                <Text style={styles.detailsTitle}>Definition: </Text>
                <Text style={styles.detailsContent}>
                  {this.state.definition}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#142C46', // Dark blue background
  },
  inputBoxContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#61DAFB',
    borderRadius: 5,
    color: '#fff',
    fontSize: 16,
    backgroundColor: '#1A2942', // Darker input field
  },
  searchButton: {
    width: '40%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: '#FF69B4', // Pink button
  },
  searchText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  outputContainer: {
    flex: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 20,
    color: '#fff',
  },
  resultContainer: {
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  detailsTitle: {
    color: '#FF69B4', // Pink color for titles
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailsContent: {
    color: '#fff',
    fontSize: 18,
  },
});


//DictionaryScreen