// @flow
import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { ImageWrapper } from '../../atoms'
import { pushScreen } from '../../../../navigation'

type PropTypes = {
  items: Array<string>,
  handlePress: ?Function,
  navigator: any,
}

const RowWrapper = styled.View`
  flex-direction: row;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width / 2};
`

const TouchableOpacity = styled.TouchableOpacity`
  width: ${Dimensions.get('window').width / 2};
`

export const FlatListItemArtistReleases = ({ item, navigateTo }: PropTypes) => (
  <RowWrapper>
    {item.map(album => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={album.spotifyId}
          onPress={navigateTo.bind(null, {
            screen: 'ArtistAlbum',
            title: album.secondaryTitle,
            passProps: {
              spotifyId: album.spotifyId,
            },
          })}
        >
          <ImageWrapper
            source={album.imageMediumUrl}
            height={Dimensions.get('window').width / 2}
            width={Dimensions.get('window').width / 2}
          />
        </TouchableOpacity>
      )
    })}
  </RowWrapper>
)

FlatListItemArtistReleases.defaultProps = {
  item: [],
  handlePress: () => {},
  navigator: {},
}
