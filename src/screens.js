import {Navigation} from 'react-native-navigation';

export function registerScreens() {
  Navigation.registerComponent('Home', () => require('./components/Home').default);
  Navigation.registerComponent('Favorites', () => require('./components/Favorites').default);
  Navigation.registerComponent('Initializing', (sc) => require('./components/Initializing').default);
}
