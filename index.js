import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from 'reduxConfig'
import { tabs as tabsConfig, drawer as drawerConfig } from 'navigation'

import App from 'components/App'
import { Drawer } from 'pages'

import { MenuIcon } from 'molecules'

const register = new Map([
  ['FirstTab', App],
  ['Drawer', Drawer],
  ['MenuIcon', MenuIcon],
])

register.forEach((value, key) => {
  Navigation.registerComponent(key, () => value, store, Provider)
})

Navigation.startTabBasedApp({
  tabs: tabsConfig,
  drawer: drawerConfig,
})
