import { Navigation } from 'react-native-navigation'

let currentScreen = ''

export const showModal = async ({ screen, props }) => {
  if (currentScreen === screen) {
    return
  }
  currentScreen = screen
  Navigation.showModal({
    screen,
    passProps: props,
    animationType: 'slide-up',
  })
}

export const dismissModal = async () => {
  currentScreen = ''
  Navigation.dismissAllModals({
    animationType: 'slide-down',
  })
}
