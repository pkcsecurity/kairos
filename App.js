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
import LoginPage from './Login';
import Landing from './Landing';
import Dashboard from './Dashboard';
import Messages from './Messages';
import AddContact from './AddContact';
import Contacts from './Contacts';
import Profile from './Profile';
import ContactSelector from './ContactSelector';
import {RNCamera} from 'react-native-camera';

import {notify} from './Notify';
import {position} from './Geolocation';

import {PushNotificationIOS} from 'react-native';
var PushNotification = require('react-native-push-notification');

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
const Camera = ({onTranscribed}) => {
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
      const options = {quality: 0.5, exif: true, base64: true};
      const data = await camera.takePictureAsync(options);
      const form = new FormData();

      const res = await fetch(
        'https://salty-stream-67702.herokuapp.com/upload',
        {
          body: JSON.stringify({base64: data.base64}),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const text = await res.text();
      const location = await position();
      onTranscribed({
        date: data.exif.DateTimeOriginal,
        text,
        location,
        data: data.base64,
      });
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

PushNotification.configure({
  onRegister: function(token) {
    console.log('TOKEN:', token);
  },
  onNotification: function(notification) {
    console.log('NOTIFICATION:', notification);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: true,
});

const App = () => {
  const [page, setPage] = useState('landing');
  const [photo, setPhoto] = useState({});
  const [mic, setMic] = useState('');

  switch (page) {
    case 'landing':
      return <Landing onJoin={() => setPage('login')} />;
    case 'login':
      return <LoginPage onSubmit={() => setPage('dashboard')} />;
    case 'dashboard':
      return (
        <Dashboard
          onPeople={() => setPage('contacts')}
          onMenu={() => setPage('menu')}
        />
      );
    case 'menu':
      return (
        <Messages
          onBack={() => setPage('dashboard')}
          onImport={() => setPage('selector')}
        />
      );
    case 'addContact':
      return <AddContact onAdd={() => setPage('contacts')} />;
    case 'contacts':
      return (
        <Contacts
          onBack={() => setPage('dashboard')}
          onYounis={() => setPage('profile')}
          onCreateNew={() => setPage('addContact')}
        />
      );
    case 'selector':
      return <ContactSelector onFinished={contacts => setPage('contacts')} />;
    case 'profile':
      return (
        <Profile
          photo={photo}
          onCamera={() => setPage('camera')}
          onBack={() => setPage('contacts')}
          mic={mic}
          onMic={t => setMic(t[0])}
        />
      );
    case 'camera':
      return (
        <Camera
          onTranscribed={ph => {
            setPage('profile');
            setPhoto(ph);
          }}
        />
      );
  }
};

console.disableYellowBox = true;

module.exports = App;
