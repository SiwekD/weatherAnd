import React from 'react';
import { ScrollView, Text, View, StyleSheet, Button } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Icon, Header } from 'react-native-elements';

import HomeScreen from '../components/Home';
import FavoritesScreen from '../components/Favorites';

const CustomHeader = ({ title }) => (
  <View style={styles.header}>
    <Text style={styles.title}>{title}</Text>
  </View>
);
const styles = StyleSheet.create({
  header: {
    backgroundColor: '#f9f9f9',
    flex: 1,
    height: 90,
    borderBottomColor: '#dfdfdf',
    borderBottomWidth: 1,
    alignSelf: 'stretch',
  },
  title: {
    fontSize: 32,
    marginLeft: 20,
    marginTop: 38,
    color: 'black',
    fontWeight: 'bold',
  },
});
export const HomeStack = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: <CustomHeader title="Today's Weather" />,
    },
  },
});

export const FavoritesStack = StackNavigator({
  Favorites: {
    screen: FavoritesScreen,
    navigationOptions: {
      headerTitle: <CustomHeader title="Favorites" />,
    },
  },
});


export const Tabs = TabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: 'Weather',
      tabBarIcon: ({ tintColor }) => <Icon name="filter-drama" size={35} color={tintColor} />,
    },
  },
  Favorites: {
    screen: FavoritesStack,
    navigationOptions: {
      tabBarLabel: 'Favorites',
      tabBarIcon: ({ tintColor }) => <Icon name="favorite-border" size={35} color={tintColor} />
    },
  },
});



export const Root = StackNavigator({
  Tabs: {
    screen: Tabs,
  },
}, {
  mode: 'modal',
  headerMode: 'none',
});
