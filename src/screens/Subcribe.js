import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Header from '../components/Header';

function SubcribeScreen() {
  return (
    <View style={styles.container}>
      <Header />
      <Text style={{marginTop: 45}}>Subcribe Screen</Text>
    </View>
  );
}

export default SubcribeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
