// @flow
import React from 'react'
import { pushScreen } from '../../../../navigation'
import { ImageWithTitle } from '../../molecules'

type Props = {
  index: number,
  item: Object,
  separators: Object,
  height: number,
  handlePushArtistReleases: Function,
}

export const FlatListItemDiscovery = ({ item, index, navigator }: Props) => (
  <ImageWithTitle
    index={index}
    handleOnPress={pushScreen.bind(null, {
      navigator: navigator,
      screen: 'ArtistReleases',
      passProps: {
        spotifyId: item.spotifyId,
        title: item.title,
      },
    })}
    source={item.imageUrl}
    title={item.title}
  />
)
