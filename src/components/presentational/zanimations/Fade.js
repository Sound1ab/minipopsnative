import React, { Component } from 'react'
import styled from 'styled-components'
import * as Animatable from 'react-native-animatable'

const Wrapper = Animatable.createAnimatableComponent(styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
`)

export class Fade extends Component {
  state = {
    isMounted: true,
  }

  componentDidMount = () => {
    !this.props.isVisible && this.setState({ isMounted: false })
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      const animation = this.animate && (await this.animate.fadeOut(250))
      animation.finished && this.setState({ isMounted: false })
    } else if (!prevProps.isVisible && this.props.isVisible) {
      this.setState({ isMounted: true })
      this.animate && this.animate.fadeIn(250)
    }
  }

  render() {
    return (
      this.state.isMounted && (
        <Wrapper
          ref={animate => (this.animate = animate)}
          pointerEvents={'none'}
          useNativeDriver={true}
        >
          {this.props.children}
        </Wrapper>
      )
    )
  }
}
