import { Auth } from 'aws-amplify'
import { uiActionMap } from '../App/genericActionMap'

export const actionMap = {
  ...uiActionMap,
  async SIGN_UP({ payload, actions }) {
    try {
      await Auth.signUp({
        username: payload.username,
        password: payload.password,
        attributes: {
          phone_number: payload.phone_number,
          email: payload.email,
        },
      })
      actions.SIGN_UP_SUCCESS(payload)
    } catch (error) {
      actions.SIGN_UP_FAILURE(error)
    }
  },
  async CONFIRM_USER({ payload, actions }) {
    try {
      await Auth.confirmSignUp(payload.username, payload.code)
      actions.CONFIRMATION_SUCCESS(payload)
    } catch (error) {
      actions.CONFIRMATION_FAILURE(error)
    }
  },
  SHOW_ERROR_MESSAGE({ dispatch, payload }) {
    console.warn('SHOW_ERROR_MESSAGE', payload)
  },
  REDIRECT_TO_LOGIN({ dispatch, payload }) {
    payload.navigator.switchToTab({
      tabIndex: 0,
    })
  },
}
