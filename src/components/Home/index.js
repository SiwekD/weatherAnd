import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    FlatList,
    TextInput,
    ListView,
    SectionList,
    View,
    Button,
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
import { List, ListItem } from 'react-native-elements';
import {Navigation} from "react-native-navigation";
import MapView from "react-native-maps";
import Geocoder from "react-native-geocoding";
import InlineImage from "../../dependencies/InlineImage.js";
import Image from "react-native-remote-svg";
import { BoxShadow } from "react-native-shadow";
import { styles } from '../../assets/styles/Style';
const remote = "../../assets/MobilePortrait.svg";
const Dimensions = require("Dimensions");
const window = Dimensions.get("window");
const { height, width } = Dimensions.get("window");
const itemWidth = (width - 20) / 3;
import { IMAGES, WEEKDAYS, MONTHS } from '../../config/values';
import { shadowOpt, values, colors } from '../../assets/styles/StyleValues';
import { API_KEY, API_URL, GEO_API_KEY, AIR_API_KEY } from '../../config/service'
type Props = {};

/* YellowBox renders warnings at the bottom of the app being developed. */
console.disableYellowBox = true;

/* temporary variables */
var listData = [],
    temperaturesData = [],
    hourlyData = [];

/* Google Maps API */
Geocoder.init(GEO_API_KEY);


/*
   The React.Component class that App inherits,
   has several methods is called at different points in the life cycle of the React component.
*/
export default class Home extends Component<Props> {


  goToScreen = (screenName) => {
    Navigation.push(this.props.componentId,{
      component: {
        name: screenName
      }
    })
  }

    /* Triggers new screen to display weather details for a chosen day. */
    onViewMore = (user) => {
      this.props.navigation.navigate('Details', { ...user });
    };

    constructor(props) {
        super(props);
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            text: "",
            refreshing: false,
            isLoading: true,
            mapRegion: null,
            latitude: null,
            city: null,
            country: null,
            datat: null,
            temperature: null,
            summary: null,
            longitude: null,
            currentlyIcon: null,
            dataSource: null,
            country: "Poland",
            city: "Tarnow"
        };
        this.rows = [];
    }

    timestampToHours = timestamp => {
        let date        = new Date(timestamp * 1000);
        let hours       = this.padZero(date.getHours());
        let minutes     =  this.padZero(date.getMinutes());
        return (hours + ":" + minutes).toString();
    };

    getWeekDay = timestamp => {
        var d = new Date(timestamp * 1000);
        return WEEKDAYS[d.getDay()];
    };

    _onPressButton() {
        Alert.alert("Przycisk wciśnięty");
    }

    padZero = n => {
        if (n < 10) return "0" + n;
        return n;
    };

    renderRow = ({ item }) => {
        let actualRowComponent = (
            <BoxShadow setting={shadowOpt}>
                <View style={styles.info_box}>
                    <Text style={styles.info_box_h5}>
                        {item.value}
                        <Text style={styles.info_box_percentage}>{item.unit}</Text>
                    </Text>
                    <Text style={styles.info_box_p} numberOfLines={0.5}>
                        {item.name.toUpperCase()}
                    </Text>
                </View>
            </BoxShadow>
        );
        return actualRowComponent;
    };

    renderHoursRow = ({ item }) => {
        let actualRowComponent = (
            <View style={styles.info_days_box}>
                <Text style={styles.info_days_title}>34</Text>
                <Image
                    source={IMAGES.icons.weather["clear-day"]}
                    style={styles.info_days_icon}
                />
                <Text style={styles.info_days_temperature}>34</Text>
            </View>
        );
        return actualRowComponent;
    };

    renderHourlyRow = item => (
        <View
        style={styles.listItemHourly}>
            <Text style={styles.hourly_text}>{item.hour}</Text>
            <Image source={IMAGES.icons.weather[item.icon]} />
            <Text style={styles.hourly_text}>{Math.round(item.temperature)}</Text>
        </View>
    );

    renderDaysRow = ({ item }) => {
        let actualRowComponent = (
            <View style={styles.info_days_box}>
                <Text style={styles.info_days_title}>{item.day}</Text>
                <Image
                    source={IMAGES.icons.weather[item.icon]}
                    style={styles.info_days_icon}
                />
                <Text style={styles.info_days_temperature}>{item.temperature}</Text>
            </View>
        );
        let touchableWrapperIos = (
            <TouchableHighlight
                activeOpacity={0.1}
                onPress={() => {
                    this._navigation.navigate("DetailsRoute", { ...item });
                }}
            >{actualRowComponent}</TouchableHighlight>
        );

        let touchableWrapperAndroid = (
            <TouchableNativeFeedback
                useForeground={true}
                onPress={() => {
                    this._navigation.navigate("DetailsRoute", { ...item });
                }}
            >{actualRowComponent}</TouchableNativeFeedback>
        );

        if (require("react-native").Platform.OS === "ios") {
            return touchableWrapperIos;
        } else return touchableWrapperAndroid;
    };

    onRegionChange(region, lastLat, lastLong) {
        this.setState({
            mapRegion: region,
            lastLat: lastLat || this.state.lastLat,
            lastLong: lastLong || this.state.lastLong
        });
    }

    _onRefresh = () => {
        this.setState(
            {
                refreshing: true
            },
            () => {
                this.componentDidMount();
            }
        );
    };

    getHealthStatus = (aqi) => {
      if (aqi>=0 && aqi<=50) return { status: "Dobra", icon: "ic-face-1-green" };
      else if (aqi>50 && aqi<=100) return { status: "Średnia", icon: "ic-face-2-yellow" };
      else if (aqi>100 && aqi<=150) return { status: "Niezdrowa dla osób wrażliwych", icon: "ic-face-3-orange" };
      else if (aqi>151 && aqi<=200) return { status: "Niezdrowa", icon: "ic-face-4-red" };
      else if (aqi>201 && aqi<=300) return { status: "Bardzo Niezdrowa", icon: "ic-face-4-red" };
      else return { status: "Zagrożenie dla życia", icon: "ic-face-4-red" };
    }

    getHourlyData = (element, index, array) => {
        if (index > 24) return;
        hourlyData.push({
            hour: this.timestampToHours(element.time),
            icon: element.icon,
            temperature: element.apparentTemperature
        });
    };

    /* ThecomponentDidMount() method is called at the moment
       when the component is created and added to the DOM tree.
    */
    async componentDidMount() {

        this.setState({ loading: true });
        await navigator.geolocation.getCurrentPosition(
            position => {
              console.log(position)
                this.setState({
                    latitude:50.016748, //position.coords.latitude,
                    longitude: 20.990469,//position.coords.longitude,
                    error: null,
                });
                /*
                Co to jest AQI?

                Wskaźnik jakości powietrza (AQI) - system służący do przeliczania mylących lub nieintuicyjnych pomiarów stężenia zanieczyszczeń na jedną,
                łatwą do zrozumienia skalę, w celu wyraźnego odzwierciedlenia ryzyka dla zdrowia wynikającego z zanieczyszczenia powietrza atmosferycznego.
                Formuła wskaźnika uwzględnia zwykle do 6 głównych zanieczyszczeń
                (PM2,5, PM10, tlenek węgla, dwutlenek siarki, dwutlenek azotu i ozon w warstwie przyziemnej)
                i oblicza odpowiednie ryzyko zdrowotne (lub wskaźnik AQI) dla każdego z nich w danym momencie.
                Ogólna liczba AQI w danym momencie jest dyktowana przez "najbardziej ryzykowną" substancję zanieczyszczającą, o najwyższym AQI.

                Standardy:
                0-50, “Good” - Dobra
                  Jakość powietrza jest uznawana za zadowalającą, a zanieczyszczenie powietrza stanowi niewielkie ryzyko lub jego brak.
                51-100, “Moderate” //Średnia
                  Jakość powietrza jest dopuszczalna; jednak niektóre zanieczyszczenia mogą być umiarkowanie szkodliwe
                  dla bardzo małej liczby osób, które są niezwykle wrażliwe na zanieczyszczenie powietrza.
                101-150, “Unhealthy for Sensitive Groups” //Niezdrowa dla osób wrażliwych
                  Niezdrowe dla wrażliwych osób - u osób wrażliwych mogą wystąpić negatywne skutki dla zdrowia.
                  Większość populacji może nie odczuwać negatywnych objawów.
                151-200, “Unhealthy” //Niezdrowa
                  Każdy może zacząć doświadczać negatywnych skutków zdrowotnych;
                  U osób wrażliwych mogą wystąpić poważniejsze skutki zdrowotne.
                201-300, “Very Unhealthy” //Bardzo niezdrowa
                  Ostrzeżenie zdrowotne, poziom alarmowy. Bardzo prawdopodobny negatywny wpływ na całą populację.
                301-500+, “Hazardous” //Zagrożenie dla życia
                  Alarm Zdrowotny: każdy może doświadczyć poważniejszych skutków zdrowotnych.

                  "p2": "ugm3", //pm2.5
                  "p1": "ugm3", //pm10
                */

/*
                fetch(`http://api.airvisual.com/v2/nearest_station?lat=50.016748&lon=20.990469&key=${AIR_API_KEY}`)
                    .then(response => response.json())
                    .then(responseJson => {
                      console.log(responseJson)
                      this.setState({
                          co: 5
                      });
                  });

*/

                fetch(`${API_URL}${API_KEY}/${this.state.latitude},${this.state.longitude}?lang=pl&units=auto`)
                .then(response => response.json())
                .then(responseJson => {
                  listData = [];
                  temperaturesData = [];
                  hourlyData = [];
                  console.log(responseJson);
                  responseJson.daily.data.forEach(element => {
                    temperaturesData.push({
                      day: this.getWeekDay(element.time),
                      icon: element.icon,
                      temperature: Math.round(element.apparentTemperatureHigh)
                    });
                  });

                  responseJson.hourly.data.forEach(this.getHourlyData);
                  rows = this.dataSource.cloneWithRows(hourlyData);

                  let today = responseJson.daily.data[0];
                  let todaySummaryHorizontalList = [
                    this.timestampToHours(today.sunriseTime),
                    this.timestampToHours(today.sunsetTime),
                    Math.round(today.pressure),
                    today.windSpeed,
                    Math.round(today.cloudCover * 100),
                    today.humidity * 100,
                    Math.round(today.temperatureHigh)
                  ];

                  let todaySummaryHorizontalListNames = [
                    "Wschód słońca",
                    "Zachód słońca",
                    "Ciśnienie",
                    "Wiatr",
                    "Zachmurzenie",
                    "Wilgotność",
                    "Temperatura maks."
                  ];

                  let units = ["", "", "hPa", "km/h", "%", "%", "°C"];

                  for (let element in todaySummaryHorizontalList) {
                    let object = {
                      name: todaySummaryHorizontalListNames[element],
                      value: todaySummaryHorizontalList[element],
                      unit: units[element]
                    };

                    listData.push(object);
                  }

                  Geocoder.from(this.state.latitude, this.state.longitude)
                  .then(json => {
                    var formatted_address = json.results[0].address_components;
                    this.setState({
                      country: formatted_address[5].long_name,
                      city: formatted_address[2].long_name,
                      street: formatted_address[1].long_name,
                      number: formatted_address[0].long_name
                    });
                  }).catch(error => console.warn(error));
                  this.setState({
                    isLoading: false,
                    refreshing: false,
                    pollution: this.getHealthStatus(156),
                    dataSource: responseJson.hourly.data,
                    datat: responseJson.daily.summary,
                    summary: responseJson.currently.summary,
                    temperature: responseJson.currently.temperature,
                    cloudCover: responseJson.currently.cloudCover,
                    humidity: responseJson.currently.humidity,
                    pressure: responseJson.currently.pressure,
                    windGust: responseJson.currently.windGust,
                    windSpeed: responseJson.currently.windSpeed,
                    currentlyIcon: responseJson.daily.icon,
                    forecast: responseJson.daily.data[1].summary + " Jutro " + responseJson.daily.data[2].summary,
                    isNight: false//responseJson.currently.icon.indexOf("night") !== -1
                  }, function () {
                    console.log("Done.");
                  }
                );
              }).catch(error => {
                console.error(error);
              });
            }, error => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
          );
        }

    /* render() method inherited from React.Component must overload each component. */
    render() {
        const data = [{ key: "t", val: "t" }];

        /*
            Night mode, the style will change when the sunset time >= current hour. [todo]
        */
        const displaySettings = {
            navigationIcon: this.state.isNight
                ? styles.nav_toggle_night
                : styles.nav_toggle,
            backgroundColor: this.state.isNight ? "#161616" : "white",
            temperature: this.state.isNight
                ? styles.weather_info__temperature__night
                : styles.weather_info__temperature,
            location: this.state.isNight
                ? styles.weather_info__location__night
                : styles.weather_info__location,
            view: this.state.isNight
                ? styles.weather_info__night
                : styles.weather_info,
            location_icon: this.state.isNight
                ? IMAGES.icons.location.white
                : IMAGES.icons.location.black,
            info_box: this.state.isNight ? styles.info_box__night : styles.info_box
        };

        /*
            Information on loading components.
        */

        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        marginTop: 140,
                        marginBottom: 20,
                        justifyContent: "center",
                        alignContent: "center",
                        alignSelf: "center"
                    }}
                >
                <Image
                    source={require("../../assets/backgrounds/loading-screen.png")}
                />
                    <ActivityIndicator />
                </View>
            );
        }

        return (
          <View
            style={{
              flex: 1,
              }}
>

            <ScrollView
                style={{ backgroundColor: displaySettings.backgroundColor }}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                    />
                }
            >
                <Image
                    source={IMAGES.background[this.state.currentlyIcon]}
                    style={styles.background}
                />
                <View style={displaySettings.view}>
                    <Text style={displaySettings.temperature}>
                        {this.state.temperature.toFixed()}°
                    </Text>

                    <Text style={displaySettings.location}>
                        {this.state.city}, {this.state.country}
                        <InlineImage
                            style={styles.location_icon}
                            source={displaySettings.location_icon}
                            onPress={() => this.props.navigation.navigate("Settings")}
                        />
                    </Text>
                    <Text style={styles.weather_info__description}>
                    Obecnie {this.state.summary.toLowerCase()}. {this.state.datat}
                    </Text>
                </View>

                {/* Weather Summary */}

                <FlatList
                    style={styles.weather_info_boxes}
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={listData}
                    renderItem={this.renderRow}
                />

                <Image
                    style={styles.location_icon_th_break}
                    source={displaySettings.location_icon}
                />

                <View style={styles.pollution_card}>

                  <View style={styles.pollution_card_info}>
                    <Text style={styles.pollution_heading}>Zanieczyszczenie Powietrza</Text>
                    <View style={styles.pollution_status}>
                      <Image
                          source={IMAGES.icons.pollution[this.state.pollution.icon]}
                          style={styles.pollution_icon}
                      />
                      <View style={styles.pollution_info}>
                        <Text style={styles.pollution_status_badge}>Jakość powietrza</Text>
                        <Text style={styles.pollution_status_text}>{this.state.pollution.status}</Text>
                        <Text style={styles.pollution_status_badge}>Pyły zawieszone</Text>
                        <Text style={styles.pollution_status_text}>PM2.5 | 66.9 µg/m³</Text>
                      </View>
                    </View>
                  </View>

                </View>
                {/* Days List Horizontally */}

                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={temperaturesData}
                    renderItem={this.renderDaysRow}
                />

                <View style={styles.weather_hourly_info}>
                    <Text style={styles.weather_hourly_info__heading}>
                        {WEEKDAYS[new Date().getDay()]} <Text style={styles.small}>/</Text>{" "}
                        {new Date().getDate()} {MONTHS[new Date().getMonth()]}
                    </Text>
                    <View style={styles.weather_forecast__heading}>
                      <Text style={styles.weather_forecast_desc}>Prognoza na najbliższe 24 godziny.</Text>
                      <Text style={styles.weather_info__description}>{this.state.forecast}</Text>
                    </View>

                </View>

                {/* Weather For Upcoming Hours Vertically */}

                <ListView
                    style={styles.containerHourly}
                    dataSource={rows}
                    numColumns={3}
                    horizontal={false}
                    renderRow={data => <this.renderHourlyRow {...data} />}
                />
            </ScrollView>
            <View style={{
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                width: '100%',
                height: 70,
                borderTopWidth: 1,
                borderColor: 'black',}}>
              <TouchableOpacity style={{
                flex:1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',}}
               //onPress={() =>  this.props.navigation.navigate('Favorites')}
               >
              <Image
              style={{width:30,height: 30,}}
                source={require('../../images/connect.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={{
                flex:1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',}}
                //onPress={() => this.goToScreen('Home')}
                 >
              <Image
              style={{width:30,height: 30,}}
              source={require('../../images/home.png')}
                />

                 </TouchableOpacity>

              </View>
              </View>
        );
    }
}
