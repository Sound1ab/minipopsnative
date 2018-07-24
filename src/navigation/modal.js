import { Navigation } from 'react-native-navigation'

export const showModal = options => {
  Navigation.showModal({
    ...options,
  })
}

export const dismissModal = () => {
  Navigation.dismissAllModals({
    animationType: 'slide-down',
  })
}
