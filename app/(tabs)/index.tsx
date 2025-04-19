import { Image, StyleSheet, Platform } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {Link} from 'expo-router';


export default function HomeScreen() {

  
  return (
    
   <ThemedView style={styles.container}>
   <ThemedText type="title">Welcome to Taskify</ThemedText>
   <ThemedText>you are logged in. Start tracking your tasks</ThemedText> 


    <ThemedText>
      Not registered? <Link href="/signup">Go to Signup</Link>
    </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container:{
  paddingTop: 50,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 5,
    position: 'absolute',
  },
});
