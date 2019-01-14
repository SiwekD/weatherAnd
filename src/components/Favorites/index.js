import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  TextInput,
  ListView,
  SectionList,
  View,
  ScrollView,
  Platform,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  YellowBox,
  ImageBackground,
  Alert,
  FlatView,
  ActivityIndicator,
  RefreshControl,
  AppRegistry
} from "react-native";

import { Tile, Icon, List, ListItem, Button } from 'react-native-elements';
import { favorites } from '../../assets/styles/Style';


export default class Favorites extends React.Component {

  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    /* temporary states [todo] */
    this.state = {
      data: []
    }
  }

  handleSettingsPress = () => {
    this.props.navigation.navigate('Settings');
  };

  handleLocationPress = (city) => {
    console.log("Wybrano ", city)
  }

  renderRow = ({ item }) => {
    let actualRowComponent = (
        <View style={favorites.loc_item}>
        <TouchableOpacity onPress={() => this.handleLocationPress(item.city)}>
          <Text style={ favorites.loc_text }>
            {item.city}, {item.country}
          </Text>
          </TouchableOpacity>
          <Icon active name={"delete-forever"} style={ favorites.loc_remove_icon } size={40} color={"#FF6D55"}/>
        </View>
    );
    return actualRowComponent;
  };


  render() {
    var listData = [{ city: "Rzeszów", country: "Poland" }, { city: "New York", country: "United States" }, { city: "Bali", country: "Indonesia" }, ];


    return (
      <ScrollView style={{backgroundColor: 'white', flex: 1}}>

        {/* Navigation Menu */}

        <View style={ favorites.nav_content}>

          <View style={favorites.nav_item}>
            <Icon active name={"map"} style={ favorites.icon } size={40} color={"#aeaeae"}/>
            <Text style={favorites.text}>Globalne Warunki Pogodowe</Text>
          </View>


          <View style={favorites.nav_item}>
            <Icon active name={"add-circle-outline"} style={ favorites.icon } size={40} color={"#aeaeae"}/>
            <Text style={favorites.text}>Dodaj lokalizacje</Text>
          </View>


        </View>

        {/* Locations List */}

        <FlatList
            style={favorites.loc_content}
            showsHorizontalScrollIndicator={false}
            horizontal={false}
            data={listData}
            renderItem={this.renderRow}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
