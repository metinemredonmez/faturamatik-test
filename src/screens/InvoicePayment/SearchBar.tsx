//import liraries
import {Icon} from '@rneui/themed';
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from 'react-native';

// create a component
const SearchBar = ({search, setSearch}: any) => {
  return (
    <View style={styles.container}>
      <View>
        <Icon name="search" color="grey" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          autoFocus={false}
          value={search}
          onChangeText={text => setSearch(text)}
          style={styles.input}
          placeholder="Kurum Ara"
          placeholderTextColor="grey"
        />
      </View>
      {search.length > 0 && (
        <TouchableOpacity
          onPress={() => setSearch('')}
          style={{width: 20, height: 20, position: 'absolute', right: 10}}>
          <Icon name="close" color="grey" />
        </TouchableOpacity>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: 'black',

    fontFamily: 'Poppins-Regular',
  },
});

//make this component available to the app
export default SearchBar;
