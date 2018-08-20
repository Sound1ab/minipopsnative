// @flow
export const SAVE_FEED = 'SAVE_FEED'
export const REMOVE_FEED_DATA = 'REMOVE_FEED_DATA'

export const saveFeed = payload => ({
  type: SAVE_FEED,
  payload,
})

export const removeFeedData = payload => ({
  type: REMOVE_FEED_DATA,
  payload,
})
