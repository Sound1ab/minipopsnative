import React from 'react'
import config from './aws-exports'
import get from 'lodash/get'
import { inAppNotification } from './src/navigation'
import { AsyncStorage } from 'react-native'
import { Aws } from './src/helpers'
import { loginMachine } from './src/machines/Login'
import { setupNetworkMonitoring } from './src/helpers'

const onNotification = notification => {
  inAppNotification({
    title: get(notification, ['_alert', 'title'], ''),
    message: get(notification, ['_alert', 'body'], ''),
    url: get(notification, ['_data', 'url'], ''),
  })
}

const onRegister = token => {
  appMachine.dispatchAction('SAVE_TOKEN_LOCALLY', { token })
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

loginMachine.dispatchAction('INIT')
