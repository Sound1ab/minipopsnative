import { Navigation } from 'react-native-navigation'
import { Provider } from 'react-redux'
import store from '../store'

import { Search } from '../components/pages'
import { Discovery } from '../components/pages'
import { Profile } from '../components/pages'
import { ArtistReleases } from '../components/pages'
import { ArtistAlbum } from '../components/pages'
import { SignIn } from '../components/pages'
import { SignUp } from '../components/pages'
import { Favourites } from '../components/pages'
import { Feed } from '../components/pages'

export const registerComponents = () => {
  const register = new Map([
    ['Search', Search],
    ['Discovery', Discovery],
    ['Profile', Profile],
    ['ArtistReleases', ArtistReleases],
    ['ArtistAlbum', ArtistAlbum],
    ['SignIn', SignIn],
    ['SignUp', SignUp],
    ['Favourites', Favourites],
    ['Feed', Feed],
  ])
  register.forEach((Component, key) => {
    Navigation.registerComponent(key, () => Component, store, Provider)
  })
}
