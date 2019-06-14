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
  const progress = status => {
    switch (status) {
      case 'hungry':
        return 1;
      case 'curious':
        return 0.75;
      case 'apathetic':
        return 0.5;
      case 'hostile':
        return 0.3;
    }
  };

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
          progress={progress(status)}
          progressTintColor={colors[status]}
          trackTintColor="#f0f0f0"
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

  const users = [
    {
      name: 'Fatma Bukhari',
      time: 'Yesterday',
      status: 'curious',
      source: require('./assets/contacts/Photo1.png'),
    },
    {
      name: 'Yusra Farooqi',
      time: 'Yesterday',
      status: 'hungry',
      source: require('./assets/contacts/Photo2.png'),
    },
    {
      name: 'Aabideen Kaleel',
      time: '3 Months Ago',
      status: 'hostile',
      source: require('./assets/contacts/Photo3.png'),
    },
    {
      name: 'Abd-al Mahdavi',
      time: 'Last Week',
      status: 'apathetic',
      source: require('./assets/contacts/Photo4.png'),
    },
    {
      name: 'Parvin Junjejo',
      time: 'Today',
      status: 'hostile',
      source: require('./assets/contacts/Photo5.png'),
    },
    {
      name: 'Fatima Arain',
      time: '3 Months Ago',
      status: 'apathetic',
      source: require('./assets/contacts/Photo6.png'),
    },
    {
      name: 'Kamran Dhanial',
      time: 'Last Week',
      status: 'curious',
      source: require('./assets/contacts/Photo7.png'),
    },
    {
      name: 'Arif Shah',
      time: 'Last Week',
      status: 'hungry',
      source: require('./assets/contacts/Photo8.png'),
    },
  ];

  const sort = (users, enabled) => {
    switch (enabled) {
      case 'alphabetize':
        return _.sortBy(users, ['name']);
      case 'status':
        return _.sortBy(users, ({status}) => {
          switch (status) {
            case 'Today':
              return 1;
            case 'Last Week':
              return 2;
            case '3 Months Ago':
              return 3;
            case 'Yesterday':
              return 2;
            default:
              return 4;
          }
        });
      case 'journey':
        return _.sortBy(users, ({status}) => {
          switch (status) {
            case 'hungry':
              return 1;
            case 'apathetic':
              return 3;
            case 'hostile':
              return 4;
            case 'curious':
              return 2;
          }
        });
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
        {_.map(sort(users, enabled), ({name, time, status, source}) => {
          return (
            <Contact
              key={`k-${name}`}
              source={source}
              name={name}
              time={time}
              status={status}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

module.exports = Contacts;
