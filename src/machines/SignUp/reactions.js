import { Auth } from 'aws-amplify'
import { inAppNotification } from '../../navigation'
import { reactions as appReactions } from '../App'

const { SHOW_LOADING, HIDE_LOADING, SHOW_ERROR_MESSAGE } = appReactions

export const reactions = {
  SHOW_LOADING,
  HIDE_LOADING,
  SHOW_ERROR_MESSAGE,
  async SIGN_UP({ payload, dispatchMachineAction }) {
    try {
      await Auth.signUp({
        username: payload.username,
        password: payload.password,
        attributes: {
          phone_number: payload.phone_number,
          email: payload.email,
        },
      })
      dispatchMachineAction('SIGN_UP_SUCCESS', payload)
    } catch (error) {
      dispatchMachineAction('SIGN_UP_FAILURE', error)
    }
  },
  async CONFIRM_USER({ payload, dispatchMachineAction }) {
    try {
      await Auth.confirmSignUp(payload.username, payload.code)
      dispatchMachineAction('CONFIRMATION_SUCCESS', payload)
      inAppNotification({
        title: "You're signed up!",
        message: 'Now you can login using your sign up credentials',
        timeout: 500,
      })
    } catch (error) {
      dispatchMachineAction('CONFIRMATION_FAILURE', {
        title: 'Something went wrong',
        message: 'Please try signing up again',
      })
    }
  },
  REDIRECT_TO_LOGIN({ payload }) {
    payload.navigator.switchToTab({
      tabIndex: 0,
    })
  },
}
