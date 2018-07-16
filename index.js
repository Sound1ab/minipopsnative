import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from './src/store'
import { tabs as tabsConfig, drawer as drawerConfig } from './src/navigation'
import Search from './src/components/pages/Search'
import { GrowContainer } from './src/components/presentational/atoms'

const register = new Map([['FirstTab', Search]])

register.forEach((Component, key) => {
  Navigation.registerComponent(key, () => Component, store, Provider)
})

Navigation.startTabBasedApp({
  tabs: tabsConfig,
})
