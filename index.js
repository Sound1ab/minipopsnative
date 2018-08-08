import React from 'react'
import { AsyncStorage } from 'react-native'
import store from './src/store'
import { Aws } from './src/helpers'
import config from './aws-exports'
import { APP_MACHINE_ACTIONS } from './src/machines/App/actions'
import { NOTIFICATION_MACHINE_ACTIONS } from './src/machines/LocalNotification/actions'
import { setupNetworkMonitoring } from './src/helpers'

Aws.configure(config)
Aws.setupPushNotificationListeners(notification => {
  store.dispatch(NOTIFICATION_MACHINE_ACTIONS.ADD_NOTIFICATION(notification))
})
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
