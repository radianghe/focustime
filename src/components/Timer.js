import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import {useKeepAwake} from 'expo-keep-awake';
import { Countdown } from './Countdown';
import { RoundedButton } from './RoundedButton';
import { Timing } from '../features/Timing';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {

  useKeepAwake();

  const ONE_SECOND_IN_MS = 1000;

  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
    1 * ONE_SECOND_IN_MS,
  ];

  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [minutes, setMinutes] = useState(0.05);

  const onEnd = (reset) => {
     Vibration.vibrate(PATTERN);
     setIsStarted(false);
     setProgress(0);
     reset();
     onTimerEnd(focusSubject);
  }


  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={(progress) => {
            setProgress(1 - progress);
          }}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on: </Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          color={colors.white}
          style={{ height: fontSizes.sm }}
          progress={progress}
        />
      </View>
      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => {
              setIsStarted(true);
            }}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => {
              setIsStarted(false);
            }}
          />
        )}
      </View>
      <View style={styles.clearSubjectWrapper}>
        <RoundedButton
          title="cancel"
          size={75}
          onPress={clearSubject}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    paddingTop: spacing.xxl,
    flexDirection: 'row',
  },
  clearSubjectWrapper:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    fontSize: fontSizes.md,
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
