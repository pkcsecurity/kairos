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
import Toast from 'react-native-simple-toast';
import LoginPage from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';

import {RNCamera} from 'react-native-camera';
import {AudioRecorder, AudioUtils} from 'react-native-audio';

const notify = msg => {
  Toast.showWithGravity(msg, Toast.SHORT, Toast.CENTER);
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
  const [page, setPage] = useState('dash');
  // return <LoginPage onSubmit={() => notify('logged in')} />;
  switch (page) {
    case 'landing':
      return <Landing onJoin={() => setPage('signup')} />;
    case 'signup':
      return <LoginPage onSubmit={() => notify('done')} />;
    case 'dash':
      return <Dashboard />;
  }
};

module.exports = App;
