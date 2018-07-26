import { updateLoading } from './genericActions'

export const uiActionMap = {
  SHOW_LOADING({ dispatch }) {
    dispatch(updateLoading(true))
  },
  HIDE_LOADING({ dispatch }) {
    dispatch(updateLoading(false))
  },
  SHOW_ERROR_MESSAGE({ payload }) {
    console.error('SHOW_ERROR_MESSAGE', payload)
  },
}
