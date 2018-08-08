import { updateLocalNotifications } from './actions'
import uuidv1 from 'uuid/v1'
import get from 'lodash/get'

export const actionMap = {
  async ADD_NOTIFICATION({ dispatch, payload, actions, state }) {
    const notification = {
      title: get(payload, ['_alert', 'title'], ''),
      message: get(payload, ['_alert', 'body'], ''),
      url: get(payload, ['_data', 'url'], ''),
      id: get(payload, ['_notificationId'], uuidv1()),
    }
    dispatch(
      updateLocalNotifications({
        notifications: [
          ...state.localNotifications.notifications,
          notification,
        ],
      }),
    )
    actions.NOTIFICATION_ADDED()
  },
  async REMOVE_NOTIFICATION({ dispatch, payload, actions, state }) {
    dispatch(
      updateLocalNotifications({
        notifications: state.localNotifications.notifications.filter(
          notification => notification.id !== payload.id,
        ),
      }),
    )
    actions.NOTIFICATION_REMOVED()
  },
}
