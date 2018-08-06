import React from 'react'
import { Linking, PushNotificationIOS } from 'react-native'
import store from './src/store'
import { APP_MACHINE_ACTIONS } from './src/machines/App/actions'
import { AwsMobile } from './src/helpers'
import { setupNetworkMonitoring } from './src/helpers'

const awsMobile = new AwsMobile({ debug: true })
awsMobile.setupPushNotifications()
awsMobile.configure()
setupNetworkMonitoring()

// Linking.getInitialURL().then((url) => {
//   console.warn('url: ' + url);
//   if (url) {
//     console.warn('Initial url is: ' + url);
//   }
// }).catch(err => console.warn('An error occurred', err));

PushNotificationIOS.getInitialNotification()
  .then(PushNotificationIOSObj => {
    if (PushNotificationIOSObj === null) {
      return
    }
    const data = PushNotificationIOSObj && PushNotificationIOSObj.getData()
    const payload = data.url
    Linking.openURL(payload).catch(err =>
      console.error('An error occurred', err),
    )
    console.warn('payload', payload)
  })
  .catch(err => console.warn('An error occurred', err))

store.dispatch(APP_MACHINE_ACTIONS.INIT())
