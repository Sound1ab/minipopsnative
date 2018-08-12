import { createSelector } from 'reselect'

const getFeed = state => state.feed.feed

export const feed = createSelector(getFeed, getFeed => getFeed)
