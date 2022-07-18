//import liraries
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Home from './src';
// create a component
const App = () => {
  return (
    <View style={styles.container}>
      <Home />
    </View>
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
