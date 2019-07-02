import React, {useRef, useEffect, useState} from 'react';
import Voice from 'react-native-voice';
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

const FloatingButton = ({onMic, onEdit, onCamera, onPressPrimary}) => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 1,
      bottom: 36,
      left: '42%',
    },
    addButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.purple,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      margin: 5,
      elevation: 5,
    },
    text: {
      height: 50,
      width: 50,
      lineHeight: 44,
      textAlign: 'center',
      color: colors.white,
      fontSize: 33,
    },
  });

  const [clicked, setClicked] = useState(false);

  const Icon = ({source, onPress}) => {
    return (
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Image style={{height: 45, width: 45, marginLeft: 2, marginTop: 2}} source={source} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    Voice.onSpeechResults = ({value}) => onMic(value);
  });

  const [recording, setRecording] = useState(false);
  const localeIdx = useRef(0);
  const locales = ['en-US', 'zh-CN', 'es-MX', 'ar-JO'];

  return (
    <View style={styles.container}>
      {clicked ? (
        [
          recording ? (
            <Icon
              onPress={() => {
                Voice.stop();
                setRecording(!recording);
              }}
              key="mic"
              source={require('./assets/stop.png')}
            />
          ) : (
            <Icon
              onPress={() => {
                Voice.start(locales[localeIdx.current]);
                localeIdx.current++;
                setRecording(!recording);
              }}
              key="mic"
              source={require('./assets/icons/Mic.png')}
            />
          ),
          <Icon
            onPress={onEdit}
            key="edit"
            source={require('./assets/icons/TextEdit.png')}
          />,
          <Icon
            onPress={onCamera}
            key="camera"
            source={require('./assets/icons/Camera.png')}
          />,
        ]
      ) : (
        <View />
      )}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (onPressPrimary) {
            onPressPrimary();
          }
          setClicked(!clicked);
        }}>
        <Text style={styles.text}>{clicked ? '-' : '+'}</Text>
      </TouchableOpacity>
    </View>
  );
};

module.exports = FloatingButton;
