// @flow
import React, { Component } from 'react'
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
`

type Props = {
  width: ?number,
  height: ?number,
  source: Object,
  borderRadius: number,
  resizeMode: string,
  fixedWidth: Boolean,
}

export class ImageWrapper extends Component<Props> {
  static defaultProps = {
    source: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
    width: null,
    height: null,
    borderRadius: 0,
    resizeMode: 'cover',
    fixedWidth: false,
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
        <Image
          onLoadEnd={this.startAnimation}
          source={{
            uri: this.props.source
              ? this.props.source
              : 'https://facebook.github.io/react-native/docs/assets/favicon.png',
          }}
          resizeMode={this.props.resizeMode}
          borderRadius={this.props.borderRadius}
        />
        <ImagePlaceholder style={{ opacity: this.opacity }}>
          <Icon name="ios-image" />
        </ImagePlaceholder>
      </ImageContainer>
    )
  }
}
