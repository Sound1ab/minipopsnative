// @flow
import React from 'react'
import styled from 'styled-components'
import { showModal } from '../../../../navigation'
import { Heading, ImageWrapper, Icon } from '../../atoms/index'
import { colors } from '../../../../theme/index'

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
  background-color: white;
`

const TextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`

const Watched = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  width: 30;
  height: 30;
  justify-content: center;
  align-items: center;
  background-color: white;
`

type PropTypes = {
  imageMediumUrl: string,
  artist: string,
  album: string,
  index: number,
  watched: Boolean,
  isOnline: Boolean,
}

export const FavouritesRow = ({
  imageMediumUrl,
  artist,
  album,
  index,
  watched,
  isOnline,
}): PropTypes => (
  <Wrapper
    index={index}
    onPress={showModal.bind(null, {
      screen: 'Compare',
      props: {
        artist,
        album,
        imageMediumUrl,
      },
    })}
    activeOpacity={10}
  >
    <ImageWrapper height={100} width={100} source={imageMediumUrl} fixedWidth />
    <TextWrapper>
      <Heading color="black" size="l">
        {artist}
      </Heading>
      <Heading color="black" size="m">
        {album}
      </Heading>
    </TextWrapper>
    {watched && (
      <Watched>
        <Icon
          name="ios-megaphone"
          size={20}
          color={isOnline ? colors.primary : colors.gray}
        />
      </Watched>
    )}
  </Wrapper>
)

FavouritesRow.defaultProps = {
  imageMediumUrl: '',
  artist: '',
  album: '',
  index: 0,
  watched: false,
  isOnline: true,
}
