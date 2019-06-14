import React, {useRef, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from './Css';
import * as _ from 'lodash';
import Nav from './Nav';
import Contacts from 'react-native-contacts';

const Contact = ({name, initials, company}) => {
  const [active, setActive] = useState(false);

  return (
    <TouchableOpacity onPress={() => setActive(!active)}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 60,
            width: 60,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 8,
            backgroundColor: colors.purple,
          }}>
          <Text style={{fontSize: 24, color: colors.white}}>{initials}</Text>
        </View>
        <View style={{flex: 10}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>{name}</Text>
          <Text style={{fontSize: 18}}>{company}</Text>
        </View>
        <View>
          <Switch
            onValueChange={v => setActive(v)}
            value={active}
            style={{marginRight: 20}}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ContactSelector = ({onFinished}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    Contacts.getAll((err, contacts) => {
      if (!err) {
        setContacts(contacts);
      }
    });
  }, []);

  return (
    <View style={{flex: 1}}>
      <Nav
        title="Import Contacts"
        sourceLeft={require('./assets/back.png')}
        onLeft={() => onFinished()}
      />
      <View style={{padding: 20}}>
        <TextInput
          placeholder="Search all contacts"
          style={{
            height: 40,
            padding: 15,
            backgroundColor: '#f0f0f0',
            borderRadius: 5,
          }}
        />
      </View>
      <ScrollView style={{flex: 1}}>
        {contacts.length > 0 ? (
          _.map(
            _.sortBy(
              _.filter(
                contacts,
                ({familyName, givenName}) => familyName && givenName,
              ),
              ['familyName', 'givenName'],
            ),
            (
              {familyName, givenName, company, emailAddresses, phoneNumbers},
              i,
            ) => {
              return (
                <Contact
                  key={`contact-${i}`}
                  name={`${givenName} ${familyName}`}
                  initials={`${familyName[0]}${givenName[0]}`}
                  company={company}
                />
              );
            },
          )
        ) : (
          <ActivityIndicator
            style={{marginTop: 30}}
            size="large"
            color={colors.purple}
          />
        )}
      </ScrollView>
    </View>
  );
};

module.exports = ContactSelector;
