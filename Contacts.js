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
        backgroundColor: '#f4f4f4',
        borderRadius: 0,
        height: 65,
        lineHeight: 65,
        width: '100%',
        marginLeft: 0,
        paddingLeft: 50,
        marginBottom: 15,
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
          borderBottomWidth: 2,
          marginTop: 10,
          marginRight: 35,
          marginLeft: 0,
          marginBottom: 15,
          borderRadius: 0,
          borderColor: enabled ? colors.purple : '#ffffff',
          height: 27,
        }}>
        <Text
          style={{
            color: enabled ? colors.purple : '#bbbccd',
            fontSize: 11,
            letterSpacing: 1,
            textAlign: 'left',
            textTransform: 'uppercase',
            lineHeight: 24,
          }}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Contact = ({source, name, time, status, onYounis}) => {
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
    <TouchableOpacity
      onPress={() => (_.startsWith(name, 'Ghaalib') ? onYounis() : null)}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Image
          style={{height: 53, width: 53, borderRadius: 3, marginLeft: 10, marginRight: 10}}
          source={source}
        />
        <View
          style={{
            paddingVertical: 4,
            paddingLeft: 15,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={{color: '#2A2A30', fontWeight: '300', fontSize: 18, marginBottom: 4, marginTop: -6}}>{name}</Text>
            <Text style={{color: '#828393', fontWeight: '100', fontSize: 12}}>{time}</Text>
          </View>
          <ProgressViewIOS
            style={{transform: [{scaleY: 2.5}], marginTop: 10, width: 150}}
            progress={progress(status)}
            progressTintColor={colors[status]}
            trackTintColor="#f0f0f0"
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Contacts = ({onBack, onCreateNew, onYounis}) => {
  const [enabled, setEnabled] = useState('alphabetize');

  const pressHandler = s => () => setEnabled(s);

  const pickTitle = state => {
    switch (enabled) {
      case 'all':
        return 'A';
      case 'alphabetize':
        return 'A';
      case 'status':
        return 'This Week';
      case 'review':
        return 'Curious';
    }
  };

  const transformContact = ({givenName, familyName}) => {
    return {
      name: `${givenName} ${familyName}`,
      time: 'Today',
      status: 'apathetic',
      source: null,
    };
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
    {
      name: 'Ghaalib Younis',
      time: 'Last Week',
      status: 'hungry',
      source: require('./assets/contacts/Photo9.png'),
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
      case 'review':
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
      <FloatingButton onPressPrimary={onCreateNew} />
      <Nav
        title="Contacts"
        onLeft={onBack}
        sourceLeft={require('./assets/back.png')}
      />
      <OmniSearch />
      <Image style={{height: 17, width: 17, position: 'absolute', top: 123, marginLeft: 20}} source={require('./assets/search.png')} />
      <View style={{flexDirection: 'row', marginHorizontal: 20}}>
        <Pill
          value="all"
          enabled={enabled === 'all'}
          onPress={pressHandler('all')}
        />
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
          value="review"
          enabled={enabled === 'review'}
          onPress={pressHandler('review')}
        />
      </View>
      <View>
        <Text style={{marginBottom: 10, marginLeft: 20, color: '#2A2A30', fontWeight: '700', fontSize: 20}}>A</Text>
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
              onYounis={onYounis}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

module.exports = Contacts;
