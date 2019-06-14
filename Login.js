import React, {useRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {colors, gradients} from './Css';
import * as _ from 'lodash';
import Toast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import Biometrics from 'react-native-biometrics';

const LoginPage = ({onSubmit}) => {
  const ref = useRef(null);

  const [loading, setLoading] = useState(false);

  const styles = StyleSheet.create({
    gradient: {
      flex: 1,
      backgroundColor: colors.gradient,
      alignItems: 'center',
      justifyContent: 'center',
    },
    view: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 30,
      width: '100%',
      height: '100%',
    },
    text: {
      color: colors.black,
      fontSize: 24,
      lineHeight: 34,
    },
    logo: {
      width: 150,
      height: 150,
      marginBottom: 20,
    },
    input: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      color: '#ffffff',
      width: '100%',
      padding: 20,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 16,
      borderRadius: 5,
      textTransform: 'uppercase',
    },
    buttons: {
      height: 60,
      marginBottom: 20,
      width: '50%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    button: {
      color: colors.white,
      textTransform: 'uppercase',
      letterSpacing: 1,
      fontWeight: '700',
      fontSize: 14,
    },
    continue: {
      fontSize: 20,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 20,
      marginTop: 50,
    },
    continueText: {
      textAlign: 'center',
      fontWeight: '700',
      color: colors.pri,
    },
  });

  const onNext = () => {
    ref.current.focus();
  };

  const onSubmitWithFinished = () => {
    const {geolocation} = navigator;
    geolocation.requestAuthorization();
    geolocation.getCurrentPosition(
      x => console.log(x),
      err => console.error(err),
      {
        enableHighAccuracy: true,
      },
    );
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit();
    }, 1000);
  };

  useEffect(() => {
    Biometrics.simplePrompt('Present your face').then(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        onSubmit();
      }, 1000);
    });
  }, [onSubmit]);

  const Login = () => {
    return (
      <LinearGradient colors={gradients.purple} style={styles.gradient}>
        <KeyboardAvoidingView style={styles.view} behavior="padding" enabled>
          <Image
            style={styles.logo}
            source={require('./assets/logo_sec.png')}
          />
          <View style={styles.buttons}>
            <Text style={styles.button}>Sign In</Text>
            <Text style={styles.button}>Sign Up</Text>
          </View>
          <TextInput
            onSubmitEditing={onNext}
            style={styles.input}
            placeholder="USERNAME"
            type="email"
            keyboardType="email-address"
            placeholderTextColor="#ddd"
            textContentType="username"
          />
          <TextInput
            ref={ref}
            style={styles.input}
            placeholder="PASSWORD"
            type="password"
            autoCompleteType="password"
            secureTextEntry={true}
            placeholderTextColor="#ddd"
            textContentType="password"
            onSubmitEditing={onSubmitWithFinished}
          />
          <TouchableOpacity
            style={styles.continue}
            onPress={onSubmitWithFinished}>
            <Text style={styles.continueText}>Continue</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </LinearGradient>
    );
  };

  const Loading = () => {
    return (
      <LinearGradient colors={gradients.purple} style={styles.gradient}>
        <ActivityIndicator size="large" color="#ffffff" />
      </LinearGradient>
    );
  };

  return loading ? <Loading /> : <Login />;
};

module.exports = LoginPage;
