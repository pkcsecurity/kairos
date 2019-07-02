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

const Nav = ({title, sourceLeft, sourceRight, onLeft, onRight}) => {
  const style = StyleSheet.create({
    container: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: 'Avenir',
    },
    button: {
      height: 30,
      width: 30,
    },
    buttonTwo: {
      height: 30,
      width: 30,
      marginTop: 20,
    },
  });

  const sourceLeftOpt = sourceLeft || require('./assets/menu.png');
  const sourceRightOpt = sourceRight || require('./assets/more.png');
  return (
    <View style={style.container}>
      <TouchableOpacity style={style.button} onPress={onLeft}>
        <Image source={sourceLeftOpt} />
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
      <TouchableOpacity style={style.buttonTwo} onPress={onRight}>
        <Image source={sourceRightOpt} />
      </TouchableOpacity>
    </View>
  );
};

module.exports = Nav;
