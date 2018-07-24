import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'

import { Login } from '../components/pages'
import { Search } from '../components/pages'
import { Discovery } from '../components/pages'
import { Profile } from '../components/pages'
import { RelatedArtist } from '../components/pages'

export const registerComponents = () => {
  const register = new Map([
    ['Login', Login],
    ['Search', Search],
    ['Discovery', Discovery],
    ['Profile', Profile],
    ['RelatedArtist', RelatedArtist],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
