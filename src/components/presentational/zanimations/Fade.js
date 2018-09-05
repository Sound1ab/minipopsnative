import React, { Component } from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'

const ABSOLUTE_POSITION = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
}

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  ${({ absolutePosition }) => absolutePosition && ABSOLUTE_POSITION};
  opacity: ${({ fadeIn }) => (fadeIn ? 0 : 1)};
`)

export class Fade extends Component {
  static defaultProps = {
    absolutePosition: true,
    isVisible: false,
    fadeIn: false,
    fadeOut: false,
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isVisible && !this.props.isVisible) {
      // Fade Out
      this.props.fadeOut && this.wrapper.fadeOut(250)
    } else if (!prevProps.isVisible && this.props.isVisible) {
      // Fade In
      this.props.fadeIn && this.wrapper.fadeIn(250)
    }
  }

  render() {
    return (
      <Wrapper
        absolutePosition={this.props.absolutePosition}
        fadeIn={this.props.fadeIn}
        ref={wrapper => (this.wrapper = wrapper)}
        pointerEvents={'none'}
        useNativeDriver={true}
      >
        {this.props.children}
      </Wrapper>
    )
  }
}
