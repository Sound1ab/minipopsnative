import { Navigation } from 'react-native-navigation'

export const inAppNotification = ({
  title = '',
  message = '',
  url = '',
  timeout = 0,
}) => {
  setTimeout(() => {
    Navigation.showInAppNotification({
      screen: 'LocalNotification',
      passProps: {
        title: title,
        message: message,
        url: url,
      },
      autoDismiss: false,
    })
  }, timeout)
}
