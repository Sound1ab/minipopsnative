import { saveToken } from './actions'

export const actionMap = {
  SAVE_TOKEN_LOCALLY({ dispatch, payload, actions }) {
    dispatch(saveToken(payload))
    actions.TOKEN_SAVED_LOCALLY(payload)
  },
}
