import Amplify from 'aws-amplify'
import config from '../../aws-exports'
import { PushNotificationIOS, AsyncStorage, Linking } from 'react-native'
import PushNotification from '@aws-amplify/pushnotification'

let aws = null

class AwsMobile {
  constructor({ debug } = {}) {
    if (debug) {
      Amplify.Logger.LOG_LEVEL = 'DEBUG'
    }
  }

  configure = () => {
    Amplify.configure(config)
  }

  setupPushNotificationListeners = callback => {
    PushNotification.onNotification(
      this.handleInAppNotification.bind(null, callback),
    )
    PushNotification.onRegister(this.handleRegister)
  }

  handleInAppNotification = (callback, notification) => {
    callback(notification)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  }

  handleRegister = async token => {
    try {
      await AsyncStorage.setItem('@Minipops:deviceToken', token)
      console.warn('in app registration', token)
    } catch (error) {
      console.log(`error saving data to AsyncStore: ${error}`)
    }
  }

  checkInitialNotification = async () => {
    try {
      const PushNotificationIOSObj = await PushNotificationIOS.getInitialNotification()
      const url =
        PushNotificationIOSObj &&
        get(PushNotificationIOSObj.getData(), ['data', 'url'], null)
      if (url) {
        Linking.openURL(url)
      }
    } catch (error) {
      console.error(`error opening link: ${error}`)
    }
  }
}

if (!aws) {
  aws = new AwsMobile()
}

export default aws
