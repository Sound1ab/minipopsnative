// @flow
import React from 'react'
import styled from 'styled-components'

const Image = styled.Image`
  flex: 1;
`

const ImageContainer = styled.View`
  flex: 1;
  flex-direction: row;
`

type Props = {
  source: Object,
  height: number,
  borderRadius: number,
  resizeMode: string,
}

export const ImageWrapper = (props: Props) => (
  <ImageContainer>
    <Image
      source={props.source}
      resizeMode={props.resizeMode}
      borderRadius={props.borderRadius}
    />
  </ImageContainer>
)

ImageWrapper.defaultProps = {
  source: {
    uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  },
  height: 300,
  borderRadius: 0,
  resizeMode: 'cover',
}
