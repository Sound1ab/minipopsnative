// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading } from '../atoms'

const TouchableOpacity = styled.TouchableOpacity``

type PropTypes = {
  handlePress: Function,
  title: String,
}

export const Button = (props: PropTypes) => (
  <TouchableOpacity onPress={props.handlePress}>
    <Heading font="l" color="black">
      {props.title}
    </Heading>
  </TouchableOpacity>
)

Button.defaultProps = {
  handlePress: () => {},
  title: '',
}
