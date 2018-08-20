// @flow
export const SAVE_COGNITO_USER_OBJECT = 'SAVE_COGNITO_USER_OBJECT'
export const REMOVE_USER_DATA = 'REMOVE_USER_DATA'

export const saveCognitoUserObject = payload => ({
  type: SAVE_COGNITO_USER_OBJECT,
  payload,
})

export const removeUserData = () => ({
  type: REMOVE_USER_DATA,
})
