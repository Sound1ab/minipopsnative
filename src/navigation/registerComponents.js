import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'

import App from '../components/App'
import {
  ArtistReleases,
  ArtistAlbum,
  Discovery,
  Favourites,
  Feed,
  Profile,
  Search,
  SignIn,
  SignUp,
} from '../components/presentational/pages'

export const registerComponents = () => {
  const register = new Map([
    ['App', App],
    ['ArtistReleases', ArtistReleases],
    ['ArtistAlbum', ArtistAlbum],
    ['Discovery', Discovery],
    ['Favourites', Favourites],
    ['Feed', Feed],
    ['Profile', Profile],
    ['Search', Search],
    ['SignIn', SignIn],
    ['SignUp', SignUp],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
