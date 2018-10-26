import React from 'react'
import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'
import { withProvider } from '../services'
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
  ChangePassword,
  Compare,
} from '../components/presentational/pages'
import { LocalNotification } from '../components/presentational/molecules'

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
    ['ChangePassword', ChangePassword],
    ['LocalNotification', LocalNotification],
    ['Compare', Compare],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(
      key,
      () => withProvider(Component),
      store,
      Provider,
    )
  })
}
