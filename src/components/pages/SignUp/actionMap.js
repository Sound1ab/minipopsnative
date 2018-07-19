import { SIGN_UP_MACHINE_ACTIONS } from './actions'
import { Auth } from 'aws-amplify'

export const actionMap = {
  async SIGN_UP({ dispatch, payload }) {
    try {
      console.log('signup', payload)
      const data = await Auth.signUp({
        username: payload.username,
        password: payload.password,
        attributes: {
          phone_number: payload.phone_number,
          email: payload.email,
        },
      })
      console.log(data)
      dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP_SUCCESS(payload))
    } catch (error) {
      dispatch(SIGN_UP_MACHINE_ACTIONS.SIGN_UP_FAILURE(error))
    }
  },
  async CONFIRM_USER({ dispatch, payload }) {
    console.log('CONFIRM_USER', payload)
    try {
      const data = await Auth.confirmSignUp(payload.username, payload.code)
      console.log(data)
      dispatch(SIGN_UP_MACHINE_ACTIONS.CONFIRMATION_SUCCESS(payload))
    } catch (error) {
      dispatch(SIGN_UP_MACHINE_ACTIONS.CONFIRMATION_FAILURE(error))
    }
  },
  SHOW_ERROR_MESSAGE({ dispatch, payload }) {
    console.warn('SHOW_ERROR_MESSAGE', payload)
  },
  REDIRECT_TO_LOGIN({ dispatch, payload }) {
    console.log('REDIRECT_TO_LOGIN')
  },
}
