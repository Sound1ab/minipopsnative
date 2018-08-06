import Amplify from 'aws-amplify'
import config from '../../aws-exports'
import { PushNotificationIOS } from 'react-native'
import PushNotification from '@aws-amplify/pushnotification'

export class AwsMobile {
  constructor({ debug }) {
    if (debug) {
      Amplify.Logger.LOG_LEVEL = 'DEBUG'
    }
  }

  configure = () => {
    Amplify.configure(config)
  }

  setupPushNotifications = () => {
    PushNotification.onNotification(notification => {
      console.warn('in app notification', notification)
      // PushNotificationIOS.requestPermissions()
      PushNotificationIOS.presentLocalNotification({
        alertBody: 'test',
      })
      // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    })

    // gets the registration token
    PushNotification.onRegister(token => {
      console.warn('in app registration', token)
    })
  }
}
