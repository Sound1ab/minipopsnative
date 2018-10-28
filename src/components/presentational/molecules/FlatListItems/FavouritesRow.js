// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading, ImageWrapper, Icon } from '../../atoms'

const Wrapper = styled.TouchableOpacity`
  flex-direction: row;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
  background-color: ${({ theme }) => theme.background};
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
  navigateTo,
  artistAlbum,
  index,
  watched,
  isOnline,
}): PropTypes => (
  <Wrapper
    index={index}
    onPress={navigateTo.bind(null, {
      title: artistAlbum.artist,
      screen: 'Compare',
      passProps: {
        artistAlbum,
      },
    })}
    activeOpacity={10}
  >
    <ImageWrapper
      height={100}
      width={100}
      source={artistAlbum.imageMediumUrl}
      fixedWidth
    />
    <TextWrapper>
      <Heading color="black" size="l">
        {artistAlbum.artist}
      </Heading>
      <Heading color="black" size="m">
        {artistAlbum.album}
      </Heading>
    </TextWrapper>
    {watched && (
      <Watched>
        <Icon name="ios-megaphone" size={20} />
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
