import { Navigation } from 'react-native-navigation'
import { MOCK_ARTIST_ALBUM } from '../store/mockData'
import { prepareIcons } from '../helpers'

export const startApp = async () => {
  const icons = await prepareIcons()

  Navigation.startTabBasedApp({
    tabs: [
      // {
      //   screen: 'ArtistAlbum',
      //   title: 'ArtistAlbum',
      // },
      {
        screen: 'Favourites',
        title: 'Favourites',
        icon: icons.favourites,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
      },
      {
        screen: 'Discovery',
        title: 'Discovery',
        icon: icons.discovery,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
      },
      {
        screen: 'Feed',
        title: 'Feed',
        icon: icons.feed,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
      },
      {
        screen: 'Search',
        title: 'Search',
        icon: icons.search,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
      },
      {
        screen: 'Profile',
        title: 'Profile',
        icon: icons.profile,
        iconInsets: {
          top: 6,
          bottom: -6,
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
      initialTabIndex: 2,
    },
    appStyle: {
      navBarHidden: true,
    },
  })
}
