// @flow
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image'
import styled, { css } from 'styled-components'
import { Animated, Easing } from 'react-native'

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
  ${({ marginLeft }) =>
    marginLeft &&
    css`
      margin-left: 16px;
    `};
`

type Props = {
  width: ?number,
  height: ?number,
  source: string,
  borderRadius: number,
  resizeMode: string,
  fixedWidth: Boolean,
  leftAlignPlaceholder: Boolean,
  rightAlignPlaceholder: Boolean,
  topAlignPlaceholder: Boolean,
  hasSibling: Boolean,
  marginLeft: boolean,
}

export class ImageWrapper extends Component<Props> {
  static defaultProps = {
    source: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    width: null,
    height: null,
    borderRadius: 0,
    resizeMode: 'cover',
    fixedWidth: false,
    leftAlignPlaceholder: false,
    rightAlignPlaceholder: false,
    topAlignPlaceholder: false,
    hasSibling: false,
    marginLeft: false,
  }
  constructor(props) {
    super(props)
    this.opacity = new Animated.Value(1)
  }

  startAnimation = () => {
    this.props.source &&
      Animated.timing(this.opacity, {
        toValue: 0,
        easing: Easing.back(),
        duration: 500,
      }).start()
  }

  render() {
    return (
      <ImageContainer
        width={this.props.width}
        height={this.props.height}
        fixedWidth={this.props.fixedWidth}
        marginLeft={this.props.marginLeft}
      >
        <FastImage
          style={{ flex: 1 }}
          source={{
            uri: this.props.source,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadEnd={this.startAnimation}
        />
      </ImageContainer>
    )
  }
}
