// @flow
import React from 'react'
import styled, { css } from 'styled-components'

const ImageContainer = styled.View`
  flex: ${({ fixedWidth }) => (fixedWidth ? 0 : 1)};
  flex-direction: row;
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `} ${({ width }) =>
    width &&
    css`
      flex-basis: ${width};
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
  fixedWidth: Boolean,
}

export const ImageWrapper = (props: Props) => (
  <ImageContainer
    width={props.width}
    height={props.height}
    fixedWidth={props.fixedWidth}
  >
    <Image
      source={{
        uri: props.source
          ? props.source
          : 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      }}
      resizeMode={props.resizeMode}
      borderRadius={props.borderRadius}
    />
  </ImageContainer>
)

ImageWrapper.defaultProps = {
  source: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
  width: null,
  height: null,
  borderRadius: 0,
  resizeMode: 'cover',
  fixedWidth: false,
}
