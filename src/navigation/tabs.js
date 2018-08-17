import { Navigation } from 'react-native-navigation'
import { prepareAppIcons, prepareLoginIcons } from '../helpers'
import { colors } from '../theme'

export const startApp = async () => {
  const icons = await prepareAppIcons()

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'Favourites',
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
        screen: 'Discovery',
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
        screen: 'Feed',
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
        screen: 'Search',
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
        screen: 'Profile',
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
      tabBarSelectedButtonColor: colors.secondary,
      tabBarButtonColor: colors.primary,
      initialTabIndex: 4,
      tabBarTranslucent: true,
    },
    appStyle: {
      navBarHidden: true,
      drawUnderTabBar: true,
    },
    // passProps: {
    //   artistAlbum: MOCK_ARTIST_ALBUM
    // },
  })
}

export const startLogin = async () => {
  const icons = await prepareLoginIcons()

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'SignIn',
        icon: icons.signIn,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'SignIn',
          tabIndex: 0,
        },
      },
      {
        screen: 'SignUp',
        icon: icons.signUp,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'SignUp',
          tabIndex: 1,
        },
      },
    ],
    tabsStyle: {
      tabBarSelectedButtonColor: colors.secondary,
      tabBarButtonColor: colors.primary,
      initialTabIndex: 0,
    },
    appStyle: {
      navBarHidden: true,
    },
  })
}

export const hideTabsOnScroll = () => {
  let pastY = 0
  return (navigator, e) => {
    if (!navigator) {
      return
    }
    let to = 'visible'
    const currentY = e.nativeEvent.contentOffset.y
    if (currentY <= 0 || (currentY > 0 && currentY < 100)) {
      to = 'visible'
    } else if (currentY > pastY) {
      to = 'hidden'
    } else if (currentY < pastY && currentY > pastY - 10) {
    } else {
      to = 'visible'
    }
    navigator.toggleTabs({
      to,
      animate: true,
    })
    pastY = currentY
  }
}

export const showTabs = navigator => {
  navigator &&
    navigator.toggleTabs({
      to: 'visible',
      animate: true,
    })
}
