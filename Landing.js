import React, {useRef, useEffect, useState} from 'react';
import {
  TouchableOpacity,
  Button,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors} from './Css';

const Landing = ({onJoin}) => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
    text: {
      color: colors.black,
      fontSize: 24,
      lineHeight: 34,
    },
    logo: {
      width: 180,
      height: 180,
      marginBottom: 100,
    },
    input: {
      backgroundColor: '#fafafa',
      color: colors.black,
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: colors.black,
      width: '80%',
      height: 40,
      marginTop: 5,
      marginBottom: 5,
    },
    subtitle: {
      color: '#aaa',
      textTransform: 'uppercase',
      fontSize: 12,
      letterSpacing: 2.5,
    },

    title: {
      color: '#2A2A30',
      fontSize: 70,
      fontWeight: '700',
      textTransform: 'lowercase',
      paddingTop: 5,
      paddingBottom: 5,
    },
    byline: {
      color: '#828393',
      paddingTop: 15,
      paddingBottom: 10,
    },
    opacity: {
      marginTop: 100,
      backgroundColor: '#5757ff',
      padding: 20,
      borderRadius: 6,
      width: '40%',
    },
    opacityText: {
      color: colors.white,
      fontSize: 17,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logo.png')} />
      <Text style={styles.subtitle}>Get Organized</Text>
      <Text style={styles.title}>kairos</Text>
      <Text style={styles.byline}>The right moment kept.</Text>
      <TouchableOpacity onPress={onJoin} style={styles.opacity}>
        <Text style={styles.opacityText}>Join us</Text>
      </TouchableOpacity>
    </View>
  );
};

module.exports = Landing;
