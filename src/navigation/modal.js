import { Navigation } from 'react-native-navigation'

export const showModal = ({ screen, props }) => {
  Navigation.showModal({
    screen,
    passProps: props,
    animationType: 'slide-up',
  })
}

export const dismissModal = () => {
  Navigation.dismissAllModals({
    animationType: 'slide-down',
  })
}
