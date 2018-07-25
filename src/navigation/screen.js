export const pushScreen = ({ navigator, screen, passProps }) => {
  navigator.push({
    screen, // unique ID registered with Navigation.registerScreen
    animated: true, // does the push have transition animation or does it happen immediately (optional)
    animationType: 'slide-horizontal', // 'fade' (for both) / 'slide-horizontal' (for android) does the push have different transition animation (optional)
    passProps,
  })
}
