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
import {
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryPie,
} from 'victory-native';
import {notify} from './Notify';
import Nav from './Nav';
import FloatingButton from './FloatingButton';

const DashboardChart = () => {
  const data = [
    {x: 'CURIOUS', y: 35},
    {x: 'HUNGRY', y: 35},
    {x: 'HOSTILE', y: 10},
    {x: 'APATHETIC', y: 20},
  ];

  const pieColors = [
    colors.curious,
    colors.hungry,
    colors.hostile,
    colors.apathetic,
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    center: {
      position: 'absolute',
      top: 140,
      left: '41%',
      alignItems: 'center',
    },
    centerTitle: {
      textTransform: 'uppercase',
      letterSpacing: 2,
      fontSize: 10,
      color: '#BBBCCD',
    },
    centerNumber: {
      fontWeight: '700',
      fontSize: 34,
      marginTop: 20,
      marginBottom: 30,
      fontFamily: 'Avenir',
    },
    pieContainer: {
      flex: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <Text style={styles.centerTitle}>People</Text>
        <Text style={styles.centerNumber}>339</Text>
        <Image source={require('./assets/stat.png')} />
      </View>
      <View style={styles.pieContainer}>
        <VictoryPie
          animate={{
            duration: 2000,
            onLoad: {duration: 1000},
            easing: 'cubicInOut',
          }}
          colorScale={pieColors}
          startAngle={240}
          endAngle={600}
          radius={120}
          data={data}
          innerRadius={105}
          cornerRadius={8}
          padAngle={3}
          labels={d => d.x}
          labelRadius={150}
          labelComponent={<VictoryLabel style={{fontSize: 10, fill: '#aaa'}} />}
        />
      </View>
    </View>
  );
};

const ButtonContainer = () => {
  const styles = StyleSheet.create({
    container: {
      height: 30,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '80%',
    },
    button: {
      color: colors.purple,
      textTransform: 'uppercase',
      fontSize: 10,
      letterSpacing: 1,
    },

    buttonContainer: {
      borderBottomColor: colors.purple,
      borderBottomWidth: 3,
      height: 20,
    },

    buttonInactive: {
      color: '#aaa',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: 1,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Text style={styles.button}>Overview</Text>
      </View>
      <Text style={styles.buttonInactive}>More +</Text>
    </View>
  );
};

const SparkRow = ({data, title, value, stroke, onPress}) => {
  const styles = StyleSheet.create({
    container: {
      height: 120,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomColor: '#ddd',
      borderBottomWidth: 1,
      zIndex: 1,
    },
    count: {
      fontSize: 20,
      fontWeight: '700',
    },
    subtitle: {
      marginTop: 3,
      fontSize: 12,
      fontWeight: '700',
      letterSpacing: 2,
      textTransform: 'uppercase',
      color: '#ddd',
    },
  });

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{height: 40, width: 100}}>
        <VictoryLine
          padding={0}
          height={40}
          width={100}
          data={data}
          animate={{
            duration: 2000,
            onload: {duration: 1000},
            easing: 'cubicInOut',
          }}
          style={{data: {stroke, strokeWidth: 2}}}
          events={[
            {
              target: 'parent',
              eventHandlers: {
                onClick: () => {
                  onPress();
                },
              },
            },
          ]}
        />
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text style={styles.count}>{value}</Text>
        <Text style={styles.subtitle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Dashboard = ({onMenu, onPeople}) => {
  const style = StyleSheet.create({
    container: {
      flex: 1,
      fontFamily: 'Avenir',
    },
    body: {
      flex: 1,
    },
    details: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 10,
    },
  });

  const peopleData = [
    {x: 1, y: 2},
    {x: 2, y: 3},
    {x: 3, y: 5},
    {x: 4, y: 4},
    {x: 5, y: 7},
  ];

  const reviewData = [
    {x: 1, y: 2},
    {x: 2, y: 1},
    {x: 3, y: 3},
    {x: 4, y: 4},
    {x: 5, y: 2},
  ];

  return (
    <View style={style.container}>
      <Nav onLeft={onMenu} onRight={onMenu} title="Dashboard" />
      <FloatingButton />
      <ScrollView style={style.body}>
        <DashboardChart />
        <View style={style.details}>
          <ButtonContainer />
          <SparkRow
            data={peopleData}
            title="People"
            value="339"
            stroke={colors.purple}
            onPress={onPeople}
          />
          <SparkRow
            data={reviewData}
            title="Review"
            value="14"
            stroke={colors.green}
            onPress={() => notify('review')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

module.exports = Dashboard;
