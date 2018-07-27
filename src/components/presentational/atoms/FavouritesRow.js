// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading, ImageWrapper } from '../atoms'
import { colors } from '../../../Theme'

const Wrapper = styled.View`
  flex-direction: row;
  margin: 8px;
  shadow-opacity: 0.2;
  shadow-radius: 5px;
  shadow-color: black;
  shadow-offset: 0px 0px;
`

const TextWrapper = styled.View`
  flex: 1;
  justify-content: center;
  padding: 16px;
`

type PropTypes = {
  imageSource: string,
  artist: string,
  album: string,
}

export const FavouritesRow = (props: PropTypes) => (
  <Wrapper>
    <ImageWrapper
      height={100}
      width={100}
      source={props.imageSource}
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
  imageSource: '',
  artist: '',
  album: '',
}

export default FavouritesRow
