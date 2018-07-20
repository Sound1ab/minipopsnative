import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from './src/store'

import { tabs as tabsConfig } from './src/navigation'

import { Login } from './src/components/pages/Login'
import Search from './src/components/pages/Search'
import Discovery from './src/components/pages/Discovery'

import Amplify from 'aws-amplify'
import config from './aws-exports'
Amplify.configure(config)

const register = new Map([
  ['Login', Login],
  ['Search', Search],
  ['Discovery', Discovery],
])

register.forEach((Component, key) => {
  Navigation.registerComponent(key, () => Component, store, Provider)
})

// Navigation.startSingleScreenApp({
//   screen: {
//     screen: 'Login',
//   },
//   appStyle: {
//     navBarHidden: true,
//   },
// })

Navigation.startTabBasedApp({
  tabs: [
    {
      screen: 'Login',
      label: 'SignUp',
      passProps: {
        form: 'signUp',
      },
    },
    {
      screen: 'Login',
      label: 'login',
      passProps: {
        form: 'signIn',
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

// Navigation.startTabBasedApp({
//   tabs: tabsConfig,
//   tabsStyle: {
//     tabBarButtonColor: '#ff6f72',
//     tabBarSelectedButtonColor: '#e24347',
//     tabBarBackgroundColor: '#ffffff',
//     initialTabIndex: 0,
//   },
//   appStyle: {
//     navBarHidden: true,
//   },
// })
