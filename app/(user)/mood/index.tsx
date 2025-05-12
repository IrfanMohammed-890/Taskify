import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function MoodScreen() {
  return (
    <View>
      <Text>MoodScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3730a3",
  }
})

