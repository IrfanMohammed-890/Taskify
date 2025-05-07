import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

export default function SingleJournal() {
  const pdfUrl = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: `https://docs.google.com/gview?embedded=true&url=${pdfUrl}` }}
        style={styles.pdf}
        originWhitelist={['*']}
        startInLoadingState
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
