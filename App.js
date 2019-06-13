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
import * as _ from 'lodash';
import Toast from 'react-native-simple-toast';
import LoginPage from './Login';
import Landing from './Landing';

import {RNCamera} from 'react-native-camera';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

const notify = msg => {
  Toast.showWithGravity(msg, Toast.SHORT, Toast.TOP);
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
      width: 80,
      height: 80,
      borderRadius: 40,
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
        <TouchableOpacity
          onPress={() =>
            notify(
              'You have received an updated message from so and so regarding such and such.',
            )
          }
          style={style.addButton}>
          <Text style={style.text}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Camera = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

  const cameraRef = useRef(null);

  takePicture = async () => {
    const camera = cameraRef.current;
    if (camera) {
      const options = {quality: 0.5, exif: true};
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
      />
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity onPress={takePicture} style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

/*
const Mic = () => {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: 'black',
    },
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    capture: {
      flex: 0,
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 20,
      alignSelf: 'center',
      margin: 20,
    },
  });

  const audioPath = AudioUtils.DocumentDirectoryPath + '/test.aac';

  const startAudio = async () => {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });

    await AudioRecorder.startRecording();
  };

  const endAudio = async () => {
    const filePath = await AudioRecorder.stopRecording();
    console.log(AudioRecorder.stopRecording);
    console.log('\n\n\n\n\n' + filePath);
  };

  useEffect(() => {
    AudioRecorder.requestAuthorization();
  });

  return (
    <View style={styles.container}>
      <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          onPressIn={startAudio}
          onPressOut={endAudio}
          style={styles.capture}>
          <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
*/

const App = () => {
  // return <LoginPage onSubmit={() => notify('logged in')} />;
  return <Landing />;
};

module.exports = App;
