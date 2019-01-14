/** @format */

import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/screens';
import App from './App';
import Index from './src/components/Home';
import { AppRegistry } from 'react-native';


AppRegistry.registerComponent('weather', () => Index);


  Navigation.registerComponent('Home', () => require('./src/components/Home/index'));
  Navigation.registerComponent('Favorites', () => require('./src/components/Favorites/index'));
  Navigation.registerComponent('Initializing', (sc) => require('./src/components/Initializing/index'));

//Navigation.registerComponent(`Initializing`, () => App);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing'
      }
    },
  });
});
