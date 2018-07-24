import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'

import Login from '../components/pages/Login'
import Search from '../components/pages/Search'
import Discovery from '../components/pages/Discovery'
import Profile from '../components/pages/Profile'

export const registerComponents = () => {
  const register = new Map([
    ['Login', Login],
    ['Search', Search],
    ['Discovery', Discovery],
    ['Profile', Profile],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
