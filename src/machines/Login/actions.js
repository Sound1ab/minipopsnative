// @flow
export const SAVE_COGNITO_USER_OBJECT = 'SAVE_COGNITO_USER_OBJECT'
export const REMOVE_COGNITO_USER_OBJECT = 'REMOVE_COGNITO_USER_OBJECT'

export const saveCognitoUserObject = payload => ({
  type: SAVE_COGNITO_USER_OBJECT,
  payload,
})

export const removeCognitoUserObject = () => ({
  type: REMOVE_COGNITO_USER_OBJECT,
})
