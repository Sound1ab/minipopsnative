import React from 'react'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import store from './src/store'
import { PushNotificationIOS } from 'react-native'
// import Analytics from '@aws-amplify/analytics';
import PushNotification from '@aws-amplify/pushnotification'
import { APP_MACHINE_ACTIONS } from './src/machines/App/actions'
// Amplify.Logger.LOG_LEVEL = 'DEBUG'

const setupPushNotifications = () => {
  PushNotification.onNotification(notification => {
    console.warn('in app notification', notification)
    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  })

  // gets the registration token
  PushNotification.onRegister(token => {
    console.warn('in app registration', token)
  })
}

setupPushNotifications()

Amplify.configure(config)
// Analytics.configure(config)

const setupNetworkMonitoring = () => {
  global.XMLHttpRequest = global.originalXMLHttpRequest
    ? global.originalXMLHttpRequest
    : global.XMLHttpRequest
  global.FormData = global.originalFormData
    ? global.originalFormData
    : global.FormData

  fetch // Ensure to get the lazy property

  if (window.__FETCH_SUPPORT__) {
    // it's RNDebugger only to have
    window.__FETCH_SUPPORT__.blob = false
  } else {
    /*
     * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
     * If you're using another way you can just use the native Blob and remove the `else` statement
     */
    global.Blob = global.originalBlob ? global.originalBlob : global.Blob
    global.FileReader = global.originalFileReader
      ? global.originalFileReader
      : global.FileReader
  }
}

setupNetworkMonitoring()
store.dispatch(APP_MACHINE_ACTIONS.INIT())
