import { Navigation } from 'react-native-navigation'
import { MOCK_ARTIST_RELEASE } from '../store/mockData'

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Favourites',
        screen: 'Favourites',
        title: 'Favourites',
      },
      {
        label: 'Discovery',
        screen: 'Discovery',
        title: 'Discovery',
      },
      {
        label: 'Search',
        screen: 'Search',
        title: 'Search',
      },
      {
        label: 'Profile',
        screen: 'Profile',
        title: 'Profile',
      },
    ],
    tabsStyle: {
      tabBarButtonColor: '#ff6f72',
      tabBarSelectedButtonColor: '#e24347',
      tabBarBackgroundColor: '#ffffff',
      initialTabIndex: 0,
    },
    appStyle: {
      navBarHidden: true,
    },
    // passProps: MOCK_ARTIST_RELEASE,
  })
}

export const startLogin = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'SignIn',
        label: 'SignIn',
        passProps: {
          form: 'signIn',
        },
      },
      {
        screen: 'SignUp',
        label: 'SignUp',
        passProps: {
          form: 'signUp',
        },
      },
    ],
    tabsStyle: {
      tabBarButtonColor: '#ff6f72',
      tabBarSelectedButtonColor: '#e24347',
      tabBarBackgroundColor: '#ffffff',
      initialTabIndex: 0,
    },
    appStyle: {
      navBarHidden: true,
    },
  })
}
