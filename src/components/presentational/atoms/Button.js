// @flow
import React from 'react'
import styled from 'styled-components'

const TouchableOpacity = styled.TouchableOpacity``

const Text = styled.Text``

type PropTypes = {
  handlePress: Function,
}

export const Button = (props: PropTypes) => (
  <TouchableOpacity onPress={props.handlePress}>
    <Text>Text</Text>
  </TouchableOpacity>
)

Button.defaultProps = {
  handlePress: () => {},
}
