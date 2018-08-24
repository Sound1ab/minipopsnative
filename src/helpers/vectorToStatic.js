import Icon from 'react-native-vector-icons/Ionicons'

export async function prepareAppIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-analytics', 35),
    Icon.getImageSource('ios-analytics-outline', 35),
    Icon.getImageSource('ios-heart', 30),
    Icon.getImageSource('ios-heart-outline', 30),
    Icon.getImageSource('ios-globe', 30),
    Icon.getImageSource('ios-globe-outline', 30),
    Icon.getImageSource('ios-search', 30),
    Icon.getImageSource('ios-search-outline', 30),
    Icon.getImageSource('ios-contact', 30),
    Icon.getImageSource('ios-contact-outline', 30),
  ])
  const [
    feed,
    feedOutline,
    favourites,
    favouritesOutline,
    discovery,
    discoveryOutline,
    search,
    searchOutline,
    profile,
    profileOutline,
  ] = icons
  return {
    feed,
    feedOutline,
    favourites,
    favouritesOutline,
    discovery,
    discoveryOutline,
    search,
    searchOutline,
    profile,
    profileOutline,
  }
}

export async function prepareLoginIcons() {
  const icons = await Promise.all([
    Icon.getImageSource('ios-log-in', 30),
    Icon.getImageSource('ios-log-in-outline', 30),
    Icon.getImageSource('ios-person-add', 30),
    Icon.getImageSource('ios-person-add-outline', 30),
  ])
  const [signIn, signInOutline, signUp, signUpOutline] = icons
  return { signIn, signInOutline, signUp, signUpOutline }
}
