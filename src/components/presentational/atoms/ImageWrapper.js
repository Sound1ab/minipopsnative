// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { Animated, Easing, Image } from 'react-native'
import { colors } from '../../../theme'
const recordImage = require('../../../assets/2000px-Disque_Vinyl-1-60.png')

const ImageContainer = styled.View`
  flex: ${({ fixedWidth }) => (fixedWidth ? 0 : 1)};
  flex-direction: row;
  ${({ isFallback }) =>
    isFallback &&
    css`
      align-items: center;
      justify-content: center;
      background-color: ${colors.gray};
    `};
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
    source: null,
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
        isFallback={!this.props.source}
        width={this.props.width}
        height={this.props.height}
        fixedWidth={this.props.fixedWidth}
        marginLeft={this.props.marginLeft}
      >
        <Image
          style={{ flex: 1 }}
          source={
            this.props.source
              ? {
                  uri: this.props.source,
                }
              : recordImage
          }
          resizeMode={this.props.source ? 'cover' : 'center'}
          onLoadEnd={this.startAnimation}
        />
      </ImageContainer>
    )
  }
}
