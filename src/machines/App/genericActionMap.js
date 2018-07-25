import { updateLoading } from './genericActions'

export const uiActionMap = {
  SHOW_LOADING({ dispatch }) {
    dispatch(updateLoading(true))
  },
  HIDE_LOADING({ dispatch }) {
    dispatch(updateLoading(false))
  },
}
