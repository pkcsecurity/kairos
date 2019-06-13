import React, {useRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
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
import Toast from 'react-native-simple-toast';

const LoginPage = ({onSubmit}) => {
  const ref = useRef(null);

  const [loading, setLoading] = useState(false);

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
      width: '80%',
      height: 40,
      marginTop: 5,
      marginBottom: 5,
      padding: 5,
    },
  });

  const onNext = () => {
    ref.current.focus();
  };

  const Login = () => {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
        <TextInput
          onSubmitEditing={onNext}
          style={styles.input}
          placeholder="Username"
          type="email"
          keyboardType="email-address"
          textContentType="username"
        />
        <TextInput
          ref={ref}
          style={styles.input}
          placeholder="Password"
          type="password"
          autoCompleteType="password"
          secureTextEntry={true}
          textContentType="password"
          onSubmitEditing={onSubmit}
        />
        <Button
          onPress={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              onSubmit();
            }, 1000);
          }}
          title="Login"
        />
      </View>
    );
  };

  const Loading = () => {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  };

  return loading ? <Loading /> : <Login />;
};

module.exports = LoginPage;
