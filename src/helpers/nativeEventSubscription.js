import {
  NativeAppEventEmitter,
  DeviceEventEmitter,
  Platform,
} from 'react-native'

export class NativeEventSubscription {
  constructor() {
    this.callbacks = []
    this.register()
  }

  register = () => {
    const emitter = this.getEventEmitter()
    this.eventSubscription = emitter.addListener(
      'bottomTabSelected',
      this.publish,
    )
  }

  unregister = () => {
    if (this.eventSubscription) {
      this.eventSubscription.remove()
    }
  }

  getEventEmitter = () => {
    return Platform.OS === 'android'
      ? DeviceEventEmitter
      : NativeAppEventEmitter
  }

  publish = ({ selectedTabIndex, unselectedTabIndex }) => {
    this.callbacks.forEach(fn => fn(selectedTabIndex, unselectedTabIndex))
  }

  subscribe = callback => {
    this.callbacks.push(callback)
  }
}
