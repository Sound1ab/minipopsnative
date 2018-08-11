// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
const recordImage = require('../../../assets/2000px-Disque_Vinyl-1-60.png')

type PropTypes = {
  size: number,
}

const Image = styled.Image`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export class MinipopsIcon extends Component<PropTypes> {
  static defaultProps = {
    size: 80,
  }

  render() {
    return <Image size={this.props.size} source={recordImage} />
  }
}
