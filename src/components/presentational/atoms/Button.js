// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading } from '../atoms'
import { colors } from '../../../Theme'

const TouchableOpacity = styled.TouchableOpacity`
  border: 1px solid ${colors.black}
  padding: 4px;
`

type PropTypes = {
  handlePress: Function,
  title: String,
}

export const Button = (props: PropTypes) => (
  <TouchableOpacity onPress={props.handlePress}>
    <Heading font="l" color="black" marginBottom={false}>
      {props.title}
    </Heading>
  </TouchableOpacity>
)

Button.defaultProps = {
  handlePress: () => {},
  title: '',
}
