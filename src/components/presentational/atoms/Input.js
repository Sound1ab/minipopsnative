// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {
  placeholder: string,
  value: string,
  handleChange: Function,
}

const ResetTextInput = styled.TextInput`
  color: white;
  background: grey;
  height: 50px;
  padding: 0 16px;
`

export const Input = (props: Props) => (
  <ResetTextInput
    autoCorrect={false}
    autoFocus
    keyboardAppearance="dark"
    clearButtonMode="always"
    placeholder={props.placeholder}
    value={props.value}
    onChangeText={props.handleChange}
  />
)

Input.defaultProps = {
  placeholder: 'test',
  value: 'hey',
  handleChange: () => {},
}
