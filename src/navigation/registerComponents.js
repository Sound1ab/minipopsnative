import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'
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
  MyDetails,
} from '../components/presentational/pages'

export const registerComponents = () => {
  const register = new Map([
    ['ArtistReleases', ArtistReleases],
    ['ArtistAlbum', ArtistAlbum],
    ['Discovery', Discovery],
    ['Favourites', Favourites],
    ['Feed', Feed],
    ['Profile', Profile],
    ['Search', Search],
    ['SignIn', SignIn],
    ['SignUp', SignUp],
    ['MyDetails', MyDetails],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
