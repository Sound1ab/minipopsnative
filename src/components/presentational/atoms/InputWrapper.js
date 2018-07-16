// @flow
import React from 'react'
import styled from 'styled-components'
import { iOSColors } from 'react-native-typography'

type Props = {
  placeholder: string,
  value: string,
  handleChange: Function,
}

const Input = styled.TextInput`
  color: ${iOSColors.gray};
  height: 50px;
  padding: 0 16px;
  border: 2px solid ${iOSColors.gray};
  border-radius: 25px;
  margin: 16px;
`

export const InputWrapper = (props: Props) => (
  <Input
    autoCorrect={false}
    autoFocus
    keyboardAppearance="dark"
    clearButtonMode="always"
    placeholder={props.placeholder}
    value={props.value}
    onChangeText={props.handleChange}
  />
)

InputWrapper.defaultProps = {
  placeholder: 'test',
  value: 'hey',
  handleChange: () => {},
}
