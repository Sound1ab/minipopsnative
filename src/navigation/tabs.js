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
          tabIndex: 0,
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
          tabIndex: 1,
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
          tabIndex: 2,
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
          tabIndex: 3,
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
          tabIndex: 4,
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
          tabIndex: 0,
        },
      },
      {
        screen: 'App',
        label: 'SignUp',
        passProps: {
          screen: 'SignUp',
          tabIndex: 1,
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
