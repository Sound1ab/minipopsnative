import { Navigation } from 'react-native-navigation'
import { prepareAppIcons, prepareLoginIcons } from '../helpers'
// import { colors } from '../theme'

export const startApp = async () => {
  const icons = await prepareAppIcons()

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'Favourites',
        title: 'Favourites',
        icon: icons.favouritesOutline,
        selectedIcon: icons.favourites,
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
        icon: icons.discoveryOutline,
        selectedIcon: icons.discovery,
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
        icon: icons.feedOutline,
        selectedIcon: icons.feed,
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
        icon: icons.searchOutline,
        selectedIcon: icons.search,
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
        icon: icons.profileOutline,
        selectedIcon: icons.profile,
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
      initialTabIndex: 2,
      // tabBarTranslucent: true,
      // tabBarButtonColor: colors.primary,
      // tabBarBackgroundColor: colors.background,
    },
    appStyle: {
      // navBarTextColor: colors.text,
      // navBarSubtitleColor: colors.text,
      // navBarBackgroundColor: colors.background,
      // screenBackgroundColor: colors.background,
      keepStyleAcrossPush: true,
      largeTitle: true,
      drawUnderTabBar: true,
    },
  })
}

export const startLogin = async () => {
  const icons = await prepareLoginIcons()

  Navigation.startTabBasedApp({
    tabs: [
      {
        screen: 'SignIn',
        selectedIcon: icons.signIn,
        icon: icons.signInOutline,
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
        selectedIcon: icons.signUp,
        icon: icons.signUpOutline,
        iconInsets: {
          top: 6,
          bottom: -6,
        },
        passProps: {
          screen: 'SignUp',
          tabIndex: 2,
        },
      },
    ],
    tabsStyle: {
      tabBarButtonColor: colors.primary,
      tabBarBackgroundColor: colors.background,
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
