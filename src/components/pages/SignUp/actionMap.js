import { SIGN_UP_MACHINE_ACTIONS } from './actions'
import { Auth } from 'aws-amplify'

export const actionMap = {
  async SIGN_UP({ dispatch, payload }) {
    try {
      // await Auth.signUp(payload)
      dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP_SUCCESS(payload))
    } catch (error) {
      dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP_FAILURE(payload))
    }
  },
  CONFIRM_USER() {
    console.log('CONFIRM_USER')
  },
  SHOW_ERROR_MESSAGE({ dispatch, payload }) {
    console.log('SHOW_ERROR_MESSAGE')
  },
  REDIRECT_TO_LOGIN({ dispatch, payload }) {
    console.log('REDIRECT_TO_LOGIN')
  },
}
