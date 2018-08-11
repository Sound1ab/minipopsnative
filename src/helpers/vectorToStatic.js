import Icon from 'react-native-vector-icons/Ionicons'
import { PixelRatio } from 'react-native'

const size = size =>
  __DEV__ ? size : PixelRatio.getPixelSizeForLayoutSize(size)

export async function prepareAppIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-analytics', size(35)),
    Icon.getImageSource('ios-heart', size(30)),
    Icon.getImageSource('ios-globe', size(30)),
    Icon.getImageSource('ios-search', size(30)),
    Icon.getImageSource('ios-contact', size(30)),
  ])
  const [feed, favourites, discovery, search, profile] = icons
  return { feed, favourites, discovery, search, profile }
}

export async function prepareLoginIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-log-in', size(30)),
    Icon.getImageSource('ios-person-add', size(30)),
  ])
  const [signIn, signUp] = icons
  return { signIn, signUp }
}
