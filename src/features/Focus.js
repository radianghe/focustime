import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import {spacing, fontSizes} from '../utils/sizes'

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          label="What would you like to focus on?"
          onChangeText={setSubject}
        />
        <View style={styles.buttonView}>
          <RoundedButton
            title="+"
            size={fontSizes.xxl}
            onPress={() => addSubject(subject)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green,
  },
  inputContainer: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
  },
  buttonView: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
});
