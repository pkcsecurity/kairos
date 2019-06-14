import React, {useRef, useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from './Css';
import * as _ from 'lodash';
import {notify} from './Notify';

const FloatingButton = () => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 1,
      bottom: 50,
      left: '42%',
    },
    addButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.purple,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    text: {
      height: 60,
      width: 60,
      lineHeight: 55,
      textAlign: 'center',
      color: colors.white,
      fontSize: 25,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => notify('hellyeah')}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

module.exports = FloatingButton;
