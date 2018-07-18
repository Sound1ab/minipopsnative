import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from './src/store'
import { tabs as tabsConfig } from './src/navigation'
import Search from './src/components/pages/Search'
import Discovery from './src/components/pages/Discovery'

const register = new Map([['Search', Search], ['Discovery', Discovery]])

register.forEach((Component, key) => {
  Navigation.registerComponent(key, () => Component, store, Provider)
})

Navigation.startTabBasedApp({
  tabs: tabsConfig,
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
