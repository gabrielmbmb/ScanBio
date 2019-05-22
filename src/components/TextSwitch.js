import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  text: {
    fontSize: 25
  }
});

const TextSwitch = props => {
  const { text, value, onValueChange } = props;

  return(
    <View style={styles.row}>
      <Text style={styles.text}>{ text }</Text>
      <Switch 
        value={value}
        onValueChange={onValueChange}
      />
    </View>
  );
};

export default TextSwitch;

