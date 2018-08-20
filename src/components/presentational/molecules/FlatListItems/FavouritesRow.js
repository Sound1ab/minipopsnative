// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading, ImageWrapper, Icon, Triangle } from '../../atoms/index'
import { colors } from '../../../../theme/index'

const Wrapper = styled.View`
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

export const FavouritesRow = (props: PropTypes) => (
  <Wrapper index={props.index}>
    <ImageWrapper
      height={100}
      width={100}
      source={props.imageMediumUrl}
      fixedWidth
    />
    <TextWrapper>
      <Heading color="black" size="l">
        {props.artist}
      </Heading>
      <Heading color="black" size="m">
        {props.album}
      </Heading>
    </TextWrapper>
    {props.watched && (
      <Watched>
        <Icon
          name="ios-megaphone"
          size={20}
          color={props.isOnline ? colors.primary : colors.gray}
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

export default FavouritesRow
