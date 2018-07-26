// @flow
import React from 'react'
import styled, { css } from 'styled-components'

const ImageContainer = styled.View`
  flex: 1;
  flex-direction: row;
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `} ${({ width }) =>
    width &&
    css`
      width: ${width};
    `};
`

const Image = styled.Image`
  flex: 1;
`

type Props = {
  width: ?number,
  height: ?number,
  source: Object,
  borderRadius: number,
  resizeMode: string,
}

export const ImageWrapper = (props: Props) => (
  <ImageContainer width={props.width} height={props.height}>
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
  width: null,
  height: null,
  borderRadius: 0,
  resizeMode: 'cover',
}
