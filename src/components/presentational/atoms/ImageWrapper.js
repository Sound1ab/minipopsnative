// @flow
import React, { Component } from 'react'
import FastImage from 'react-native-fast-image'
import styled, { css } from 'styled-components'
import { colors } from '../../../theme'
import { Animated, Easing } from 'react-native'
import { Icon } from '../atoms'

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

const ImagePlaceholder = styled(Animated.View)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 8px;
  ${({ hasSibling, leftAlignPlaceholder }) =>
    hasSibling &&
    leftAlignPlaceholder &&
    css`
      padding: 8px 4px 8px 8px;
    `};
  ${({ hasSibling, rightAlignPlaceholder }) =>
    hasSibling &&
    rightAlignPlaceholder &&
    css`
      padding: 8px 8px 8px 4px;
    `};
  ${({ hasSibling, topAlignPlaceholder }) =>
    hasSibling &&
    topAlignPlaceholder &&
    css`
      padding-top: 8px;
    `};
  ${({ hasSibling, topAlignPlaceholder }) =>
    hasSibling &&
    !topAlignPlaceholder &&
    css`
      padding-top: 0px;
    `};
`

const Inner = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${colors.primary};
`

type Props = {
  width: ?number,
  height: ?number,
  source: Object,
  borderRadius: number,
  resizeMode: string,
  fixedWidth: Boolean,
  leftAlignPlaceholder: Boolean,
  rightAlignPlaceholder: Boolean,
  topAlignPlaceholder: Boolean,
  hasSibling: Boolean,
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
      >
        <FastImage
          style={{ flex: 1 }}
          source={{
            uri: this.props.source
              ? this.props.source
              : 'https://facebook.github.io/react-native/docs/assets/favicon.png',
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
          onLoadEnd={this.startAnimation}
        />
      </ImageContainer>
    )
  }
}
