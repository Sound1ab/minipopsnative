import Icon from 'react-native-vector-icons/Ionicons'

export async function prepareAppIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-analytics', 35),
    Icon.getImageSource('ios-heart', 30),
    Icon.getImageSource('ios-globe', 30),
    Icon.getImageSource('ios-search', 30),
    Icon.getImageSource('ios-contact', 30),
  ])
  const [feed, favourites, discovery, search, profile] = icons
  return { feed, favourites, discovery, search, profile }
}

export async function prepareLoginIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-log-in', 30),
    Icon.getImageSource('ios-person-add', 30),
  ])
  const [signIn, signUp] = icons
  return { signIn, signUp }
}
