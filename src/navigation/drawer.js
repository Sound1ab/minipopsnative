export const drawer = {
  // optional, add this if you want a side menu drawer in your app
  left: {
    // optional, define if you want a drawer from the left
    screen: 'Drawer', // unique ID registered with Navigation.registerScreen
  },
  style: {
    // ( iOS only )
    contentOverlayColor: 'rgba(0,0,0,0.2)', // optional, add this if you want a overlay color when drawer is open
    leftDrawerWidth: 70, // optional, add this if you want a define left drawer width (50=percent)
    shouldStretchDrawer: true, // optional, iOS only with 'MMDrawer' type, whether or not the panning gesture will “hard-stop” at the maximum width for a given drawer side, default : true
  },
  type: 'MMDrawer', // optional, iOS only, types: 'TheSideBar', 'MMDrawer' default: 'MMDrawer'
  animationType: 'parallax', //optional, iOS only, for MMDrawer: 'door', 'parallax', 'slide', 'slide-and-scale'
  // for TheSideBar: 'airbnb', 'facebook', 'luvocracy','wunder-list'
  disableOpenGesture: false, // optional, can the drawer be opened with a swipe instead of button
}
