import React from 'react'
import store from './src/store'
import config from './aws-exports'
import get from 'lodash/get'
import { inAppNotification } from './src/navigation'
import { AsyncStorage } from 'react-native'
import { Aws } from './src/helpers'
import { APP_MACHINE_ACTIONS } from './src/machines/App/actions'
import { setupNetworkMonitoring } from './src/helpers'
import { NOTIFICATION_MACHINE_ACTIONS } from './src/machines/LocalNotification/actions'

const onNotification = notification => {
  inAppNotification({
    title: get(notification, ['_alert', 'title'], ''),
    message: get(notification, ['_alert', 'body'], ''),
    url: get(notification, ['_data', 'url'], ''),
  })
}

const onRegister = token => {
  store.dispatch(NOTIFICATION_MACHINE_ACTIONS.SAVE_TOKEN({ token }))
}

Aws.configure(config)
Aws.setupPushNotificationListeners(onNotification, onRegister)
Aws.checkInitialNotification()

setupNetworkMonitoring()

getDeviceToken()

async function getDeviceToken() {
  try {
    const value = await AsyncStorage.getItem('@Minipops:deviceToken')
    if (value !== null) {
      console.warn('DeviceToken', value)
    }
  } catch (error) {
    console.warn(`could not retrieve data from AsyncStore: ${error}`)
  }
}

store.dispatch(APP_MACHINE_ACTIONS.INIT())
