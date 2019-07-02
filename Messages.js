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
import {notify} from './Notify';
import Nav from './Nav';

const SubRow = ({color, title, value}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{width: 40}} />
      <View
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderBottomColor: '#ddd',
          borderBottomRadius: 1,
          paddingVertical: 20,
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <View
          style={{
            height: 9,
            width: 9,
            borderRadius: 9,
            backgroundColor: color,
            marginRight: 20,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 15, fontWeight: 100}}>{title}</Text>
          <Text style={{fontSize: 15, fontWeight: 100}}>{value}</Text>
        </View>
      </View>
    </View>
  );
};

const Row = ({icon, title}) => {
  const styles = StyleSheet.create({
    row: {
      flex: 1,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingVertical: 20,
    },
  });
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{width: 40}}>
        <Text style={{fontSize: 24, color: '#bbbccc', fontWeight: '700', lineHeight: 26, textAlign: 'center', width: 15}}>
          {icon}
        </Text>
      </View>
      <View style={styles.row}>
        <Text style={{fontSize: 15, fontWeight: '700'}}>{title}</Text>
      </View>
    </View>
  );
};

const Messages = ({onBack, onImport}) => {
  const styles = StyleSheet.create({
    settings: {
      flex: 1,
      paddingVertical: 20,
      fontSize: 15,
      fontWeight: 'bold',
      marginTop: 70,
      marginLeft: 40,
    },
  });
  return (
    <View>
      <Nav
        title=""
        sourceLeft={require('./assets/back.png')}
        sourceRight={require('./assets/plus.png')}
        onLeft={onBack}
        onRight={onImport}
      />
      <View style={{paddingHorizontal: 40}}>
        <View
          style={{
            paddingLeft: 40,
            marginTop: 20,
            marginBottom: 40,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Image
            height={80}
            width={80}
            style={{height: 80, width: 80, borderRadius: 5}}
            source={require('./assets/avatars/2.jpg')}
          />
          <View style={{paddingLeft: 20, paddingBottom: 10}}>
            <Text style={{fontSize: 18, fontWeight: '700'}}>Katie</Text>
            <Text style={{fontSize: 12, color: '#aaa'}}>Swenson</Text>
          </View>
        </View>
        <View>
          <Row icon="+" title="Tasks" />
          <Row icon="-" title="People" />
          <SubRow color={colors.curious} title="Curious" value="120" />
          <SubRow color={colors.hungry} title="Hungry" value="80" />
          <SubRow color={colors.apathetic} title="Apathetic" value="90" />
          <SubRow color={colors.hostile} title="Hostile" value="49" />
        </View>
        <Text style={styles.settings}>Settings</Text>
      </View>
    </View>
  );
};

module.exports = Messages;
