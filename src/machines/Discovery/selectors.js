import chunk from 'lodash/chunk'
import { createSelector } from 'reselect'

const artistReleases = state => state.discovery.artistReleases

export const artistReleasesChunked = createSelector(
  artistReleases,
  singularReleases => {
    return chunk(
      singularReleases.reduce((a, b) => {
        if (!a.find(v => v.secondaryTitle === b.secondaryTitle)) {
          a = [...a, b]
        }
        return a
      }, []),
      2,
    )
  },
)
