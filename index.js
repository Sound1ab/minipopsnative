import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from 'store'
import { tabs as tabsConfig, drawer as drawerConfig } from 'navigation'

import { Drawer, Ebay } from 'pages'
import { MenuIcon } from 'molecules'
import { withNavigationButton } from 'utility'

const register = new Map([
  ['FirstTab', Ebay],
  ['Drawer', Drawer],
  ['MenuIcon', MenuIcon],
])

register.forEach((Component, key) => {
  Navigation.registerComponent(key, () => Component, store, Provider)
})

Navigation.startTabBasedApp({
  tabs: tabsConfig,
  drawer: drawerConfig,
})
