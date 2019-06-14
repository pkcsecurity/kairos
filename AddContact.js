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
import { notify } from './Notify';
import _ from 'lodash';

const ContactRow = ({name, value, thisRef, nextRef, type, keyboardType, disabled, onSubmit}) => {

  const [input, setInput] = useState("");

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 30,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    }}>
    <View style={{flex: 3}}>
      <Text style={{fontSize: 20, color: (disabled ? '#aaa' : 'black')}}>{name}</Text>
    </View>
    <View style={{flex: 7}}>
      <TextInput keyboardType={keyboardType || 'default'} textContentType={type || 'none'} returnKeyLabel={nextRef ? 'Next' : 'Save'} returnKeyType={nextRef ? 'next' : 'done'} ref={thisRef} style={{height: 30, fontSize: 20, color: (disabled ? '#aaa' : 'black')}} value={input} onChangeText={setInput} onSubmitEditing={() => nextRef ? nextRef.current.focus() : onSubmit()}/>
    </View>
  </View>);
}

const AddContact = () => {

  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const countryRef = useRef(null);

  const [saved, setSaved] = useState(false);
  const [photo, setPhoto] = useState(false);

  const onSubmit = () => {
    setSaved(true);
    notify('This contact has been uploaded.');
  };

  const onPress = () => {
    CameraRoll.getPhotos({first: 1, assetType: 'Photos'}).then((res) => setPhoto(_.shuffle(res.edges)[0]));
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <Nav title="Add contact" sourceLeft={require('./assets/back.png')} sourceRight={require('./assets/more.png')} />
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image style={{height: 125, width: 125, borderRadius: 8}} source={photo ? {uri: photo.node.image.uri} : require('./assets/avatars/3.jpg')} />
        <TouchableOpacity style={{position: 'absolute', top: 105}} onPress={onPress}>
          <Image source={require('./assets/edit.png')}/>
        </TouchableOpacity>
      </View>
      <View style={{padding: 20, paddingTop: 40}}>
      <Text style={{fontSize: 14, textTransform: 'uppercase', letterSpacing: 2, color: '#ddd'}}>Contact</Text>
      <ContactRow disabled={saved} nextRef={emailRef} name="Name" value="Jordan Halvorsen" />
      <ContactRow disabled={saved} keyboardType="email-address" type="email" thisRef={emailRef} nextRef={phoneRef} name="Email" value="jordan@vrasa.com" />
      <ContactRow disabled={saved} keyboardType="phone-pad" type="telephoneNumber" thisRef={phoneRef} nextRef={countryRef} name="Phone" value="+1 615 538-8532" />
      <ContactRow disabled={saved} type="countryName" thisRef={countryRef} name="Country" value="France" onSubmit={onSubmit} />
      </View>
    </KeyboardAvoidingView>
  );
};

module.exports = AddContact;
