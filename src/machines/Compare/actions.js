// @flow
export const SAVE_PRODUCTS = 'SAVE_PRODUCTS'
export const REMOVE_PRODUCTS = 'REMOVE_PRODUCTS'

export const saveProducts = payload => ({
  type: SAVE_PRODUCTS,
  payload,
})

export const removeProducts = payload => ({
  type: REMOVE_PRODUCTS,
  payload,
})
