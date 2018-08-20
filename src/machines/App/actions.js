export const UPDATE_LOADING = 'UPDATE_LOADING'
export const SAVE_TOKEN = 'SAVE_TOKEN'
export const UPDATE_NETINFO_STATUS = 'UPDATE_NETINFO_STATUS'

export const updateLoading = (payload: Boolean) => ({
  type: UPDATE_LOADING,
  payload,
})

export const saveToken = payload => ({
  type: SAVE_TOKEN,
  payload,
})

export const updateNetInfoStatus = payload => ({
  type: UPDATE_NETINFO_STATUS,
  payload,
})
