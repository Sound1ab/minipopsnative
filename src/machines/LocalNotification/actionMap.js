import { updateLocalNotifications, saveToken } from './actions'
import uuidv1 from 'uuid/v1'
import get from 'lodash/get'

export const actionMap = {
  ADD_NOTIFICATION({ dispatch, payload, actions, state }) {
    const notification = {
      title: get(payload, ['notification', '_alert', 'title'], ''),
      message: get(payload, ['notification', '_alert', 'body'], ''),
      url: get(payload, ['notification', '_data', 'url'], ''),
      id: get(payload, ['notification', '_notificationId'], uuidv1()),
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
  REMOVE_NOTIFICATION({ dispatch, payload, actions, state }) {
    dispatch(
      updateLocalNotifications({
        notifications: state.localNotifications.notifications.filter(
          notification => notification.id !== payload.id,
        ),
      }),
    )
    actions.NOTIFICATION_REMOVED()
  },
  SAVE_TOKEN_LOCALLY({ dispatch, payload, actions }) {
    dispatch(saveToken(payload))
    actions.TOKEN_SAVED_LOCALLY(payload)
  },
}
