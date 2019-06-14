import React, {useRef, useEffect, useState} from 'react';
import {
  Button,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from './Css';
import * as _ from 'lodash';
import Nav from './Nav';
import FloatingButton from './FloatingButton';

const Metadata = ({value, name}) => {
  return (
    <View style={{paddingLeft: 20}}>
      <Text style={{fontSize: 20, fontWeight: '700'}}>{value}</Text>
      <Text
        style={{
          marginTop: 3,
          marginBottom: 10,
          fontSize: 12,
          color: '#ddd',
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}>
        {name}
      </Text>
    </View>
  );
};

const EventRow = ({amount, unit, type, title, message}) => {
  return (
    <View style={{flexDirection: 'row', padding: 20}}>
      <View style={{flex: 2}}>
        <Text style={{fontSize: 16}}>{amount}</Text>
        <Text style={{color: '#aaa', marginTop: 3}}>{unit}</Text>
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            height: 16,
            width: 16,
            borderWidth: 3,
            borderRadius: 8,
            borderColor: colors[type],
          }}
        />
      </View>
      <View style={{flex: 6}}>
        <Text style={{fontSize: 16, marginBottom: 10}}>{title}</Text>
        <Text style={{color: '#aaa'}}>{message}</Text>
      </View>
    </View>
  );
};

const Profile = ({onBack, onMic, mic, onEdit, onCamera, photo}) => {
  const styles = StyleSheet.create({
    title: {
      fontSize: 30,
      fontWeight: '700',
      paddingLeft: 20,
      paddingBottom: 20,
    },
  });

  return (
    <View style={{flex: 1}}>
      <Nav
        title=""
        onLeft={onBack}
        sourceLeft={require('./assets/back.png')}
        sourceRight={require('./assets/more.png')}
      />
      <FloatingButton onMic={onMic} onEdit={onEdit} onCamera={onCamera} />
      <Text style={styles.title}>Ghaalib Younis</Text>
      <View style={{flexDirection: 'row'}}>
        <Image source={require('./assets/contacts/Photo9.png')} />
        <View>
          <Metadata value="2 days" name="Last Contact" />
          <Metadata value="France" name="Location" />
          <Metadata value="Active" name="Status" />
        </View>
      </View>
      <ScrollView style={{flex: 1}}>
        <View>
          {mic ? (
            <EventRow
              amount={0}
              unit="hours"
              title="Uploaded Recording"
              message={mic}
              type="curious"
            />
          ) : (
            <View />
          )}
        </View>
        {photo.text ? (
          <EventRow
            amount={0}
            unit="hours"
            title="Uploaded Notes"
            message={photo.text}
            type="curious"
          />
        ) : (
          <View />
        )}
        <EventRow
          amount={2}
          unit="days"
          title="Last Contact"
          message=""
          type="curious"
        />
        <EventRow
          amount={4}
          unit="days"
          title="Note"
          message="Ghaalib is interested in reading the teachings of Jesus. He was given a NT on 6/4 and read Mark 1-3...."
          type="curious"
        />
        <EventRow
          amount={3}
          unit="weeks"
          title="Hungry"
          message="Sent me an email"
          type="hungry"
        />
        <EventRow
          amount={2}
          unit="months"
          title="Phone Call"
          message="Had a brief phone chat. Ghaalib seemed really busy and was eager to move on."
          type="apathetic"
        />
      </ScrollView>
    </View>
  );
};

module.exports = Profile;
