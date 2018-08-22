import React, { Component } from 'react'
import { LayoutAnimation } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

var CustomLayoutSpring = {
  duration: 250,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
    springDamping: 0.7,
  },
}

export class Fade extends Component {
  componentDidMount = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring)
  }

  componentWillUnmount = () => {
    LayoutAnimation.configureNext(CustomLayoutSpring)
  }

  render() {
    return <Wrapper pointerEvents={'none'}>{this.props.children}</Wrapper>
  }
}
