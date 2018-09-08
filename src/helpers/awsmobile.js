import Amplify from 'aws-amplify'
import { PushNotificationIOS, AsyncStorage, Linking } from 'react-native'
import PushNotification from '@aws-amplify/pushnotification'
import get from 'lodash/get'
// import { default as AWS_CONFIG } from '../../aws-exports'

// const AWS_CONFIG = {
//   aws_cognito_identity_pool_id: Config.aws_cognito_identity_pool_id,
//   aws_cognito_region: Config.aws_cognito_region,
//   aws_content_delivery: Config.aws_content_delivery,
//   aws_content_delivery_bucket: Config.aws_content_delivery_bucket,
//   aws_content_delivery_bucket_region: Config.aws_content_delivery_bucket_region,
//   aws_content_delivery_cloudfront: Config.aws_content_delivery_cloudfront,
//   aws_content_delivery_cloudfront_domain:
//     Config.aws_content_delivery_cloudfront_domain,
//   aws_project_id: Config.aws_project_id,
//   aws_project_name: Config.aws_project_name,
//   aws_project_region: Config.aws_project_region,
//   aws_resource_name_prefix: Config.aws_resource_name_prefix,
//   aws_sign_in_enabled: Config.aws_sign_in_enabled,
//   aws_user_pools: Config.aws_user_pools,
//   aws_user_pools_id: Config.aws_user_pools_id,
//   aws_user_pools_web_client_id: Config.aws_user_pools_web_client_id,
// }

const AWS_CONFIG = {
  aws_cognito_identity_pool_id:
    'us-east-1:15304825-5060-4508-8523-f006490d18fa',
  aws_cognito_region: 'us-east-1',
  aws_content_delivery: 'enable',
  aws_content_delivery_bucket: 'minipopsnative-hosting-mobilehub-48057481',
  aws_content_delivery_bucket_region: 'us-east-1',
  aws_content_delivery_cloudfront: 'enable',
  aws_content_delivery_cloudfront_domain: 'd3a4jw51g5hgns.cloudfront.net',
  aws_project_id: '3baf1c1b-a92d-48c5-a728-23cacb87bd58',
  aws_project_name: 'minipopsnative-2018-07-21-08-18-16',
  aws_project_region: 'us-east-1',
  aws_resource_name_prefix: 'minipopsnative-mobilehub-48057481',
  aws_sign_in_enabled: 'enable',
  aws_user_pools: 'enable',
  aws_user_pools_id: 'us-east-1_tGAbryLIa',
  aws_user_pools_mfa_type: 'ON',
  aws_user_pools_web_client_id: '5c633e6epbk5p794014651c6u1',
}

let aws = null

class AwsMobile {
  constructor({ debug } = {}) {
    if (debug) {
      Amplify.Logger.LOG_LEVEL = 'DEBUG'
    }
  }

  configure = () => {
    Amplify.configure(AWS_CONFIG)
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
