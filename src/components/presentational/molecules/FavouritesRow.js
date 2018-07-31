// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading, ImageWrapper } from '../atoms/index'
import { colors } from '../../../theme/index'

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

type PropTypes = {
  imageUrl: string,
  artist: string,
  album: string,
  index: number,
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
  </Wrapper>
)

FavouritesRow.defaultProps = {
  imageUrl: '',
  artist: '',
  album: '',
  index: 0,
}

export default FavouritesRow
