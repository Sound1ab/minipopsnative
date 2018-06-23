export const leftButtons = navigator => ({
  leftButtons: [
    {
      id: 'menu',
      disableIconTint: true,
      component: 'MenuIcon',
      passProps: {
        navigator,
      },
    },
  ],
})
