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
      color: '#f0f0f0',
    },
    centerNumber: {
      fontWeight: '700',
      fontSize: 24,
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

const FloatingButton = () => {
  const styles = StyleSheet.create({
    container: {
      position: 'absolute',
      zIndex: 1,
      bottom: 50,
      left: '42%',
    },
    addButton: {
      width: 60,
      height: 60,
      borderRadius: 30,
      backgroundColor: colors.purple,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

      elevation: 5,
    },
    text: {
      height: 60,
      width: 60,
      lineHeight: 55,
      textAlign: 'center',
      color: colors.white,
      fontSize: 25,
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => notify('hellyeah')}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const Nav = () => {
  const style = StyleSheet.create({
    container: {
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '700',
      fontFamily: 'Avenir',
    },
    leftMenu: {
      height: 20,
      width: 20,
    },
    rightMenu: {
      height: 10,
      width: 30,
    },
  });

  return (
    <View style={style.container}>
      <Image source={require('./assets/menu.png')} />
      <Text style={style.title}>Dashboard</Text>
      <Image source={require('./assets/more.png')} />
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
      letterSpacing: 1,
    },

    buttonContainer: {
      borderBottomColor: colors.purple,
      borderBottomWidth: 2,
    },

    buttonInactive: {
      color: '#aaa',
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

const SparkRow = ({title, value}) => {
  const styles = StyleSheet.create({
    container: {
      height: 120,
      width: '80%',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      borderBottomColor: '#fafafa',
      borderBottomWidth: 1,
    },
  });

  const data = [
    {x: 1, y: 2},
    {x: 2, y: 3},
    {x: 3, y: 5},
    {x: 4, y: 4},
    {x: 5, y: 7},
  ];
  return (
    <View style={styles.container}>
      <View>
        <Text>339</Text>
        <Text>People</Text>
      </View>
      <View>
        <VictoryLine
          height={15}
          width={100}
          data={data}
          style={{data: {stroke: '#ff0000'}}}
        />
      </View>
    </View>
  );
};

const Dashboard = () => {
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

  return (
    <View style={style.container}>
      <Nav />
      <FloatingButton />
      <ScrollView style={style.body}>
        <DashboardChart />
        <View style={style.details}>
          <ButtonContainer />
          <SparkRow title="People" value="339" />
          <SparkRow title="Review" value="14" />
        </View>
      </ScrollView>
    </View>
  );
};

module.exports = Dashboard;
