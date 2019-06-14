import React, {useRef, useEffect, useState} from 'react';
import {
  Button,
  CameraRoll,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Nav from './Nav';
import {notify} from './Notify';
import _ from 'lodash';
import {position} from './Geolocation';

const ContactRow = ({
  name,
  value,
  thisRef,
  nextRef,
  type,
  keyboardType,
  disabled,
  onSubmit,
}) => {
  const [input, setInput] = useState('');

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 20, color: disabled ? '#aaa' : 'black'}}>
          {name}
        </Text>
      </View>
      <View style={{flex: 7}}>
        <TextInput
          keyboardType={keyboardType || 'default'}
          autoCorrect={false}
          textContentType={type || 'none'}
          returnKeyLabel={nextRef ? 'Next' : 'Save'}
          returnKeyType={nextRef ? 'next' : 'done'}
          ref={thisRef}
          style={{height: 30, fontSize: 20, color: disabled ? '#aaa' : 'black'}}
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() =>
            nextRef ? nextRef.current.focus() : onSubmit()
          }
        />
      </View>
    </View>
  );
};

const Coordinates = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    position().then(x => {
      console.log(x);
      setLocation(x);
    });
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}>
      <View style={{flex: 3}}>
        <Text style={{fontSize: 20, color: '#aaa'}}>Location</Text>
      </View>
      <View style={{flex: 7}}>
        <Text>
          {location.coords
            ? `${location.coords.latitude}, ${location.coords.longitude}`
            : ''}
        </Text>
      </View>
    </View>
  );
};

const AddContact = ({onAdd}) => {
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const countryRef = useRef(null);

  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState(false);

  const onSubmit = () => {
    setSaved(true);
    notify('This contact has been uploaded.');
    setTimeout(onAdd, 2000);
  };

  const onPress = () => {
    CameraRoll.getPhotos({
      first: 10,
      assetType: 'Photos',
      mimeTypes: ['image/jpeg'],
    }).then(res => setPhoto(res.edges[7]));
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <Nav
        title="Add contact"
        onLeft={onAdd}
        sourceLeft={require('./assets/back.png')}
        sourceRight={require('./assets/more.png')}
      />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{height: 125, width: 125, borderRadius: 8}}
          source={
            photo
              ? {uri: photo.node.image.uri}
              : require('./assets/avatars/3.jpg')
          }
        />
        <TouchableOpacity
          style={{position: 'absolute', top: 105}}
          onPress={onPress}>
          <Image source={require('./assets/edit.png')} />
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, paddingTop: 40}}>
        <Text
          style={{
            fontSize: 14,
            textTransform: 'uppercase',
            letterSpacing: 2,
            color: '#ddd',
          }}>
          Contact
        </Text>
        <ContactRow
          disabled={saved}
          nextRef={emailRef}
          name="Name"
          value="Jordan Halvorsen"
        />
        <ContactRow
          disabled={saved}
          keyboardType="email-address"
          type="emailAddress"
          thisRef={emailRef}
          nextRef={phoneRef}
          name="Email"
          value="jordan@vrasa.com"
        />
        <ContactRow
          disabled={saved}
          keyboardType="phone-pad"
          type="telephoneNumber"
          thisRef={phoneRef}
          nextRef={countryRef}
          name="Phone"
          value="+1 615 538-8532"
        />
        <ContactRow
          disabled={saved}
          type="countryName"
          thisRef={countryRef}
          name="Country"
          value="France"
          onSubmit={onSubmit}
        />
        <Coordinates />
      </View>
    </KeyboardAvoidingView>
  );
};

module.exports = AddContact;
