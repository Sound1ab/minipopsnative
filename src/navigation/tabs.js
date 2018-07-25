import { Navigation } from 'react-native-navigation'

export const startApp = () => {
  Navigation.startTabBasedApp({
    tabs: [
      {
        label: 'Search',
        screen: 'Search',
        title: 'Search',
      },
      {
        label: 'Discovery',
        screen: 'Discovery',
        title: 'Discovery',
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
