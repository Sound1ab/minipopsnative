// @flow
import React from 'react'
import styled from 'styled-components'
import chunk from 'lodash/chunk'
import { Dimensions } from 'react-native'
import { ImageWrapper } from '../atoms'

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

export const ImageGrid = ({ item, navigator, handlePress }: PropTypes) => (
  <RowWrapper>
    {item.map(album => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          key={album.spotifyId}
          onPress={handlePress.bind(null, {
            ...album,
            navigator: navigator,
          })}
        >
          <ImageWrapper
            source={album.imageMediumUrl}
            height={Dimensions.get('window').width / 2}
            width={Dimensions.get('window').width / 2}
            handlePress={handlePress}
          />
        </TouchableOpacity>
      )
    })}
  </RowWrapper>
)

ImageGrid.defaultProps = {
  item: [],
  handlePress: () => {},
  navigator: {},
}
