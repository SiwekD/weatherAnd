'use strict';
import {
	StyleSheet
} from 'react-native';
const Dimensions = require("Dimensions");
const window = Dimensions.get("window");
var {
	height,
	width
} = Dimensions.get("window");
var itemWidth = (width - 20) / 3;

export const favorites = {

	background: {
		backgroundColor: '#ffffff',
	},
	nav_content: {
		paddingTop: 90,
		margin: 40,
		borderBottomWidth: 1,
		paddingBottom: 26,
		borderColor: "#f2f2f2",
	},
	nav_item: {
		flexDirection: 'row',
		marginBottom: 20,
		position: "relative",
		fontWeight: 200,
	},
	text: {
		fontSize: 18,
		color: "#B0B0B0",
		marginTop: 10,
		marginLeft: 10,
	},
	icon: {"display":"inline-block","backgroundRepeat":"no-repeat","backgroundPosition":"center","width":25,"minHeight":"23px","marginRight":"15px","position":"relative","top":"6px"},
	loc_item: {
		flexWrap: 'wrap',
		flexDirection: 'row',
		display:"flex",
		flex: 1,
		justifyContent: 'space-between',
		fontWeight: 700,
		marginBottom:25,
	},
	loc_content: {
		marginLeft: 40,
		marginRight: 40,
	},
	loc_text: {
		fontSize: 18,
		fontWeight: "bold",
		marginTop: 10,

	}
}


export const styles = {

            containerHourly: {
				flex: 1,
				flexDirection: 'column',
				margin: 40,

			},
			listItemHourly: {
				flexDirection:'row',
				flexWrap: 'wrap',
				marginTop: 20,
				justifyContent: 'space-between',
			},
			hourly_text: {
				fontWeight: "300",
				fontSize: 18,
			},
			location_icon_th_break: {
				marginTop: 10,
				width: 25,
				height: 25,
				alignSelf: "center"
			},
			small: {
				opacity: 0.5,
				fontSize: 12,
				marginLeft: 10,
				marginRight: 10
			},
			pollution_card: {
				backgroundColor: '#eeeeee',
				height: 240,
				marginTop: 25,
			},
			pollution_status: {
				flexDirection: 'row',
				flexWrap: 'wrap',
				flex: 1,
				marginTop: 15,
	
			},
			pollution_status_badge: {
				fontSize: 14,
				fontWeight: 'bold',
				marginTop: 5,
			},
			pollution_info: {
				flex: 1,
				marginLeft: 20,
				overflow: 'hidden'
			},
			pollution_status_text: {
				fontSize: 22,
			},
			pollution_card_info: {
				margin: 25,
			},
			pollution_heading: {
				fontSize: 34,
				fontFamily: "System",
				color: 'black',
				fontWeight: 'bold'
			},
      weather_hourly_info: {
        marginTop: 10,
        flexDirection: 'column'
      },
			weather_hourly_info__heading: {
				fontSize: 16,
				flexDirection: "row",
				marginLeft: 40,
				flexWrap: "wrap",
				fontWeight: "bold"
			},
      weather_forecast__heading: {
        fontSize: 16,
        opacity: 0.9,
				flexDirection: "row",
				marginLeft: 40,
        marginRight: 40,
				flexWrap: "wrap",
      },
      weather_forecast_desc: {
        color: "#bcbcbc",
        marginBottom: 10,
      },
			background: {
				top: 30,
				width: window.width * 0.75,
				height: window.height * 0.33,
				position: "relative",
				alignSelf: "center"
			},
			info_days_box: {
				marginTop: 30,
				marginLeft: 40,
				marginBottom: 30,
				alignSelf: "center",
				justifyContent: "flex-start",
				alignItems: "center"
			},
			info_days_title: {
				alignSelf: "center",
				fontSize: 14
			},
			pollution_icon: {
				width: 105,
				height: 105,
			},
			info_days_icon: {
				marginTop: 5,
				marginBottom: 5,
				width: 45,
				height: 45,
				alignSelf: "center"
			},
				info_days_temperature: {
					alignSelf: "center",
					fontSize: 20
				},
				weather_info: {
					marginTop: 86.666,
					marginLeft: 53.333,
					marginRight: 53.333,
					marginBottom: 26.666,
					borderBottomWidth: 1,
					paddingBottom: 26,
					borderColor: "#f2f2f2"
				},
				weather_info__night: {
					marginTop: 86.666,
					marginLeft: 53.333,
					marginRight: 53.333,
					marginBottom: 26.666,
					borderBottomWidth: 1,
					paddingBottom: 26,
					borderColor: "#2a2a2a"
				},

				weather_info__temperature__night: {
					color: "white",
					fontSize: 82,
					fontFamily: "System"
				},
				weather_info__temperature: {
					color: "#222222",
					fontSize: 82,
					fontFamily: "System"
				},
				weather_info__location: {
					color: "#222222",
					fontSize: 24,
					flexDirection: "row",
					flexWrap: "wrap",
					fontWeight: "bold",
					fontFamily: "System"
				},
				weather_info__location__night: {
					color: "white",
					fontSize: 24,
					flexDirection: "row",
					flexWrap: "wrap",
					fontWeight: "bold",
					fontFamily: "System"
				},
				weather_info__description: {
					color: "#bcbcbc",
					top: 10,
					fontSize: 16,
					fontFamily: "System"
				},
				weather_info_boxes: {
					flex: 1,
					flexDirection: "row"
				},
				nav_toggle_night: {
					position: "absolute",
					width: 30,
					height: 30,
					color: "#000",
					marginLeft: 23.333,
					marginTop: 26.666
				},
				nav_toggle: {
					position: "absolute",
					width: 30,
					height: 30,
					marginLeft: 23.333,
					marginTop: 26.666
				},
				info_box_p: {
					fontSize: 12.32,
					fontWeight: "700",
					marginTop: 5,
					marginBottom: 0,
					marginLeft: 18,
					opacity: 0.35
				},
				info_box_percentage: {
					fontSize: 17.75,
					color: "black"
				},
				info_box_h5: {
					fontSize: 21.95,
					fontWeight: "bold",
					color: "black",
					marginTop: 24,
					marginLeft: 18,
					marginBottom: 0
				},
				info_box__night: {
					zIndex: 1,
					backgroundColor: "#161616",
					width: "100%",
					height: "100%",
					borderRadius: 7,
					borderWidth: 0,
					overflow: "hidden"
				},
				info_box: {
					zIndex: 1,
					backgroundColor: "#ffffff",
					width: "100%",
					height: "100%",
					borderRadius: 7,
					borderWidth: 0,
					overflow: "hidden"
				},
				info: {
					padding: 10,
					fontSize: 24
				},
				location_icon: {},
				about_weather: {
					fontSize: 20,
					color: "blue"
				},
				heading_city_name: {
					fontSize: 24
				},
				container: {
					flex: 1
				}

        };
