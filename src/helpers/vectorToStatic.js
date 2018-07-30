import Icon from 'react-native-vector-icons/Ionicons'
import { PixelRatio } from 'react-native'

const size = size =>
  __DEV__ ? size : PixelRatio.getPixelSizeForLayoutSize(size)

export async function prepareIcons() {
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
