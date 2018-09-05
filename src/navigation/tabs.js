import { Navigation } from 'react-native-navigation'
import { prepareAppIcons, prepareLoginIcons } from '../helpers'
import { colors } from '../theme'

const MOCK_DATA = {
  artist: 'The cure',
  album: 'Head on the door',
  imageMediumUrl:
    'https://images.pexels.com/photos/271955/pexels-photo-271955.jpeg?auto=compress&cs=tinysrgb&h=350',
  discogsProducts: [
    {
      title: 'Cure - Head On The Door with a really long title',
      link: 'https://www.vinyltap.co.uk/head-on-the-door',
      price: '£19.99',
      image:
        'https://www.vinyltap.co.uk/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/i/m/image_236192_3_1_3_5_8_6_6_10_1_266708_1_118752_1_9_1_230137.jpg',
    },
    {
      title: 'Cure - Head On The Door',
      link: 'https://www.vinyltap.co.uk/head-on-the-door',
      price: '£19.99',
      image:
        'https://www.vinyltap.co.uk/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/i/m/image_236192_3_1_3_5_8_6_6_10_1_266708_1_118752_1_9_1_230137.jpg',
    },
    {
      title: 'Cure - Head On The Door',
      link: 'https://www.vinyltap.co.uk/head-on-the-door',
      price: '£19.99',
      image:
        'https://www.vinyltap.co.uk/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/i/m/image_236192_3_1_3_5_8_6_6_10_1_266708_1_118752_1_9_1_230137.jpg',
    },
    {
      title: 'Cure - Head On The Door',
      link: 'https://www.vinyltap.co.uk/head-on-the-door',
      price: '£19.99',
      image:
        'https://www.vinyltap.co.uk/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/i/m/image_236192_3_1_3_5_8_6_6_10_1_266708_1_118752_1_9_1_230137.jpg',
    },
  ],
}

export const startApp = async () => {
  const icons = await prepareAppIcons()

  Navigation.startTabBasedApp({
    tabs: [
      // {
      //   screen: 'Compare',
      //   title: 'Compare',
      //   icon: icons.favouritesOutline,
      //   selectedIcon: icons.favourites,
      //   iconInsets: {
      //     top: 6,
      //     bottom: -6,
      //   },
      //   passProps: {
      //     ...MOCK_DATA,
      //     screen: 'Compare',
      //     tabIndex: 0,
      //   },
      // },
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
      tabBarButtonColor: colors.primary,
      initialTabIndex: 0,
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
