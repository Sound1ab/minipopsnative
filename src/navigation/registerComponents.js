import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'

import App from '../components/App'
import { ArtistReleases } from '../components/pages'
import { ArtistAlbum } from '../components/pages'

export const registerComponents = () => {
  const register = new Map([
    ['App', App],
    ['ArtistReleases', ArtistReleases],
    ['ArtistAlbum', ArtistAlbum],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
