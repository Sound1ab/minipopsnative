let currentScreen = ''

export const pushScreen = ({ navigator, screen, passProps }) => {
  if (currentScreen === screen) {
    return
  }
  currentScreen = screen
  navigator.push({
    screen, // unique ID registered with Navigation.registerScreen
    animated: true, // does the push have transition animation or does it happen immediately (optional)
    animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
    passProps,
  })
}

export const popScreen = navigator => {
  currentScreen = ''
  navigator.pop({
    animated: true,
    animationType: 'slide-horizontal',
  })
}
