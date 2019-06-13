import React, {useEffect, useState} from 'react';
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
import * as _ from 'lodash';

const LoginScreen = () => {
  const [fontState, setFontState] = useState(false);

  return fontState ? (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./assets/logo.png')} />
      <TextInput style={styles.input} placeholder="Username" type="email" />
      <TextInput style={styles.input} placeholder="Password" type="password" />
      <Button onPress={() => false} title="Login" />
    </View>
  ) : (
    <View />
  );
};

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
    width: '60%',
    height: 60,
    marginBottom: 20,
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
});

const Avatar = ({source}) => {
  const style = StyleSheet.create({
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });

  return <Image style={style.avatar} source={source} />;
};

const Page = () => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.white,
    },
    body: {
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.white,
    },
    nav: {
      height: '10%',
      backgroundColor: colors.pri,
    },
    addButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: colors.tri,
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
      height: 50,
      width: 50,
      lineHeight: 46,
      textAlign: 'center',
      color: colors.white,
      fontSize: 25,
    },
    floating: {
      position: 'absolute',
      bottom: '7%',
      left: '43%',
    },
    avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
  });

  return (
    <View style={style.container}>
      <View style={style.body}>
        <Avatar source={require('./assets/avatars/2.jpg')} />
      </View>
      <View style={style.nav} />
      <View style={style.floating}>
        <TouchableOpacity style={style.addButton}>
          <Text style={style.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return <Page />;
};

module.exports = App;
