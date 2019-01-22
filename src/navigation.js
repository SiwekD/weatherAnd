import { Navigation } from 'react-native-navigation'

export const goHome = () => Navigation.setRoot({
  root: {
    bottomTabs: {
      id: 'BottomTabsId',
      children: [
        {
          component: {
            name: 'Home',
            options: {
              bottomTab: {
                fontSize: 12,
                text: 'Pogoda',
                icon: require('./images/home.png'),
              }
            }
          },
        },
        {
          component: {
            name: 'Favorites',
            options: {
              bottomTab: {
                text: 'Ulubione',
                fontSize: 12,
                badge: '0',
                testID: 'bottomTabTestID',
                icon: require('./images/connect.png')
              }
            }
          },
        },
      ],
    },
  }
});
