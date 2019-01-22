/** @format */

import { Navigation } from 'react-native-navigation';
import {registerScreens} from './src/screens';
import App from './App';
import Home from './src/components/Home';
import Favorites from './src/components/Favorites';
import Initializing from './src/components/Initializing';
import { AppRegistry } from 'react-native';


AppRegistry.registerComponent('weather', () => Home);


Navigation.registerComponent('Home', () => Home);
Navigation.registerComponent('Favorites', () => Favorites);
Navigation.registerComponent('Initializing', (sc) => Initializing);

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
