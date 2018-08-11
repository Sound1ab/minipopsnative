import Amplify from 'aws-amplify'
import config from '../../aws-exports'
import { PushNotificationIOS, AsyncStorage, Linking } from 'react-native'
import PushNotification from '@aws-amplify/pushnotification'
import get from 'lodash/get'

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

  setupPushNotificationListeners = async (onNotification, onRegister) => {
    PushNotification.onNotification(
      this.handleInAppNotification.bind(null, onNotification),
    )
    const deviceToken = await this.getDeviceToken()
    if (deviceToken) {
      onRegister(deviceToken)
    } else {
      PushNotification.onRegister(this.handleRegister.bind(null, onRegister))
    }
  }

  handleInAppNotification = (callback, notification) => {
    callback(notification)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  }

  handleRegister = async (onRegister, token) => {
    try {
      await AsyncStorage.setItem('@Minipops:deviceToken', token)
      onRegister(token)
      console.warn('in app registration', token)
    } catch (error) {
      console.log(`error saving data to AsyncStore: ${error}`)
    }
  }

  getDeviceToken = async () => {
    try {
      return AsyncStorage.getItem('@Minipops:deviceToken')
    } catch (error) {
      console.warn(`could not retrieve data from AsyncStore: ${error}`)
    }
  }

  checkInitialNotification = async () => {
    try {
      const PushNotificationIOSObj = await PushNotificationIOS.getInitialNotification()
      const url =
        PushNotificationIOSObj &&
        get(PushNotificationIOSObj.getData(), ['url'], null)
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
