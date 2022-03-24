import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import Constants from 'expo-constants';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/components/Timer';
import {FocusHistory} from './src/features/FocusHistory';

export default function App() {
  const [currentSubject, setCurrentSubject] = useState(null);
  const [minutes, setMinutes] = useState(0.1);
  const [history, setHistory] = useState([]);

  return (
    <View style={styles.container}>
      {currentSubject == null ? (
        <>
        <Focus addSubject={setCurrentSubject} />
        <FocusHistory history={history}/>
        </>
      ) : (
        <Timer
          minutes={minutes}
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject])
          }}
          clearSubject={() => {setCurrentSubject(null)}}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.green,
  },
});
