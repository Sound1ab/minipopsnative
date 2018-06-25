import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from 'reduxConfig'
import { tabs as tabsConfig, drawer as drawerConfig } from 'navigation'

import { Drawer, Ebay } from 'pages'
import { MenuIcon } from 'molecules'
import { NavigationButton } from 'utility'

const register = new Map([
  ['FirstTab', Ebay],
  ['Drawer', Drawer],
  ['MenuIcon', MenuIcon],
])

register.forEach((value, key) => {
  const combined = (
    <NavigationButton render={navigator => <value navigator={navigator} />} />
  )
  const newValue = <value />
  console.log(combined)
  Navigation.registerComponent(key, () => newValue, store, Provider)
})

Navigation.startTabBasedApp({
  tabs: tabsConfig,
  drawer: drawerConfig,
})
