//import liraries
import React, { Component } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Home from './src';
// create a component
const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Home />
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default App;
