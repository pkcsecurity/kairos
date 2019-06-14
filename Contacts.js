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
  ProgressViewIOS,
} from 'react-native';
import {colors} from './Css';
import * as _ from 'lodash';
import Nav from './Nav';
import FloatingButton from './FloatingButton';

const OmniSearch = () => {
  return (
    <TextInput
      style={{
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 5,
        height: 40,
        lineHeight: 40,
        paddingHorizontal: 10,
        marginHorizontal: 20,
      }}
    />
  );
};

const Pill = ({enabled, value, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          backgroundColor: enabled ? colors.purple : colors.white,
          borderWidth: 2,
          marginTop: 10,
          marginRight: 5,
          borderRadius: 5,
          borderColor: enabled ? colors.purple : '#f0f0f0',
          height: 27,
          width: 80,
        }}>
        <Text
          style={{
            color: enabled ? colors.white : colors.black,
            fontSize: 12,
            textAlign: 'center',
            lineHeight: 24,
          }}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Contact = ({source, name, time, status}) => {
  return (
    <View style={{flexDirection: 'row', padding: 20}}>
      <Image style={{height: 53, width: 53, borderRadius: 5}} source={source} />
      <View
        style={{
          paddingVertical: 4,
          paddingLeft: 15,
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{fontWeight: '700', fontSize: 18}}>{name}</Text>
          <Text>{time}</Text>
        </View>
        <ProgressViewIOS
          style={{transform: [{scaleY: 2.5}], width: 150}}
          progress={0.5}
          progressTintColor={colors[status]}
        />
      </View>
    </View>
  );
};

const Contacts = () => {
  const [enabled, setEnabled] = useState('alphabetize');

  const pressHandler = s => () => setEnabled(s);

  const pickTitle = state => {
    switch (enabled) {
      case 'alphabetize':
        return 'A';
      case 'status':
        return 'This Week';
      case 'journey':
        return 'Curious';
    }
  };

  return (
    <View style={{flex: 1}}>
      <FloatingButton />
      <Nav title="Contacts" sourceLeft={require('./assets/back.png')} />
      <OmniSearch />
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Pill
          value="alphabetize"
          enabled={enabled === 'alphabetize'}
          onPress={pressHandler('alphabetize')}
        />
        <Pill
          value="status"
          enabled={enabled === 'status'}
          onPress={pressHandler('status')}
        />
        <Pill
          value="journey"
          enabled={enabled === 'journey'}
          onPress={pressHandler('journey')}
        />
      </View>
      <ScrollView style={{flex: 1, marginTop: 5}}>
        <Text
          style={{
            paddingHorizontal: 20,
            paddingTop: 20,
            fontSize: 24,
            fontWeight: '700',
          }}>
          {pickTitle(enabled)}
        </Text>
        {_.range(1, 9).map(i => {
          return (
            <Contact
              key={`k-${i}`}
              source={require(`./assets/contacts/Photo1.png`)}
              name="Ghaalib Younis"
              time="Yesterday"
              status="hostile"
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

module.exports = Contacts;
