import { Navigation } from 'react-native-navigation'
import { prepareIcons } from '../helpers'

export const startApp = async () => {
  const icons = await prepareIcons()

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'App',
        title: 'Favourites',
        icon: icons.favourites,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'Favourites',
        },
      },
      {
        screen: 'App',
        title: 'Discovery',
        icon: icons.discovery,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'Discovery',
        },
      },
      {
        screen: 'App',
        title: 'Feed',
        icon: icons.feed,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'Feed',
        },
      },
      {
        screen: 'App',
        title: 'Search',
        icon: icons.search,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'Search',
        },
      },
      {
        screen: 'App',
        title: 'Profile',
        icon: icons.profile,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'Profile',
        },
      },
    ],
    tabsStyle: {
      tabBarButtonColor: '#ff6f72',
      tabBarSelectedButtonColor: '#e24347',
      initialTabIndex: 0,
      tabBarTranslucent: true,
    },
    appStyle: {
      navBarHidden: true,
    },
    // passProps: {
    //   artistAlbum: MOCK_ARTIST_ALBUM
    // },
  })
}

export const startLogin = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'App',
        label: 'SignIn',
        passProps: {
          screen: 'SignIn',
        },
      },
      {
        screen: 'App',
        label: 'SignUp',
        passProps: {
          screen: 'SignUp',
        },
      },
    ],
    tabsStyle: {
      tabBarButtonColor: '#ff6f72',
      tabBarSelectedButtonColor: '#e24347',
      tabBarBackgroundColor: '#ffffff',
      initialTabIndex: 2,
    },
    appStyle: {
      navBarHidden: true,
    },
  })
}
