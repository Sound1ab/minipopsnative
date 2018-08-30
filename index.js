import React from 'react'
import get from 'lodash/get'
import { NetInfo } from 'react-native'
import { inAppNotification } from './src/navigation'
import { AsyncStorage } from 'react-native'
import { Aws } from './src/helpers'
import { loginMachine } from './src/machines/Login'
import { appMachine } from './src/machines/App'
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

const onConnectivityChange = () => {
  let count = 0
  return connectionInfo => {
    if (connectionInfo.type === 'none' || connectionInfo.type === 'unknown') {
      appMachine.dispatchAction('OFFLINE', {
        status: 'offline',
        initial: count === 0,
      })
    } else {
      appMachine.dispatchAction('ONLINE', {
        status: 'online',
        initial: count === 0,
      })
    }
    count++
  }
}

NetInfo.addEventListener('connectionChange', onConnectivityChange())

Aws.configure()
Aws.setupPushNotificationListeners(onNotification, onRegister)
Aws.checkInitialNotification()

__DEV__ && setupNetworkMonitoring()

__DEV__ && getDeviceToken()

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
