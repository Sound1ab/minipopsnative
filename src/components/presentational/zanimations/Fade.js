import React, { Component } from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: ${({ fadeIn }) => (fadeIn ? 0 : 1)};
`)

export class Fade extends Component {
  static defaultProps = {
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
