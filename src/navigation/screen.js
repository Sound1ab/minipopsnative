import { colors } from '../theme'

let currentScreen = ''

export const pushScreen = ({ navigator, screen, passProps, title }) => {
  // if (currentScreen === screen) {
  //   return
  // }
  // currentScreen = screen
  navigator.push({
    screen,
    animated: true,
    animationType: 'slide-horizontal',
    title,
    passProps,
    navigatorStyle: {
      navBarTextColor: colors.primary,
    },
  })
}

export const popScreen = navigator => {
  // currentScreen = ''
  navigator.pop({
    animated: true,
    animationType: 'slide-horizontal',
  })
}
