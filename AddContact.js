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
  onChange,
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
          textContentType={type || 'none'}
          returnKeyLabel={nextRef ? 'Next' : 'Save'}
          returnKeyType={nextRef ? 'next' : 'done'}
          ref={thisRef}
          autoCorrect={false}
          style={{height: 30, fontSize: 20, color: disabled ? '#aaa' : 'black'}}
          value={input}
          onChangeText={t => {
            setInput(t);
            onChange(t);
          }}
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
        <Text style={{color: '#aaa'}}>
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
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = () => {
    setSaved(true);
    notify('This contact has been uploaded.');

    var data = JSON.stringify({
      title: name,
      contact_phone: [
        {
          value: phone,
        },
      ],
      contact_email: [
        {
          value: email,
        },
      ],
      contact_address: [
        {
          value: country,
        },
      ],
    });
    console.log(data);

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === 4) {
      }
      onAdd();
    });

    const bearer =
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcHJhZ3Vla2Fpcm9zLndwZW5naW5lLmNvbSIsImlhdCI6MTU2MDQ4Mzc5MSwibmJmIjoxNTYwNDgzNzkxLCJleHAiOjE1NjEwODg1OTEsImRhdGEiOnsidXNlciI6eyJpZCI6IjIifX19.BFO8IuM-WxVnxaB4pTIz-H_oSWF4a9jSgcMiAZh3eZ0';

    xhr.open(
      'POST',
      'https://praguekairos.wpengine.com/wp-json/dt-posts/v2/contacts/',
    );
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', 'Bearer ' + bearer);
    xhr.send(data);
  };

  const onPress = () => {
    CameraRoll.getPhotos({first: 1, assetType: 'Photos'}).then(res =>
      setPhoto(_.shuffle(res.edges)[0]),
    );
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <Nav
        title="Add contact"
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
          onChange={setName}
          disabled={saved}
          nextRef={emailRef}
          name="Name"
          value="Jordan Halvorsen"
        />
        <ContactRow
          onChange={setEmail}
          disabled={saved}
          keyboardType="email-address"
          type="email"
          thisRef={emailRef}
          nextRef={phoneRef}
          name="Email"
          value="jordan@vrasa.com"
        />
        <ContactRow
          onChange={setPhone}
          disabled={saved}
          keyboardType="phone-pad"
          type="telephoneNumber"
          thisRef={phoneRef}
          nextRef={countryRef}
          name="Phone"
          value="+1 615 538-8532"
        />
        <ContactRow
          onChange={setCountry}
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
