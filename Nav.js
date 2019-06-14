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
    leftMenu: {
      height: 20,
      width: 20,
    },
    rightMenu: {
      height: 10,
      width: 30,
    },
  });

  const sourceLeftOpt = sourceLeft || require('./assets/menu.png');
  const sourceRightOpt = sourceRight || require('./assets/more.png');
  return (
    <View style={style.container}>
      <TouchableOpacity onPress={onLeft}>
        <Image source={sourceLeftOpt} />
      </TouchableOpacity>
      <Text style={style.title}>{title}</Text>
      <TouchableOpacity onPress={onRight}>
        <Image source={sourceRightOpt} />
      </TouchableOpacity>
    </View>
  );
};

module.exports = Nav;
