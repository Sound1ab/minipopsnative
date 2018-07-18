// @flow
import React from 'react'
import styled from 'styled-components'
import { iOSColors } from 'react-native-typography'

type Props = {
  placeholder: string,
  value: string,
  handleChange: Function,
  search: string,
  placeholderTextColor: string,
}

const Input = styled.TextInput`
  color: ${iOSColors.black};
  height: 32px;
  padding: ${({ search }) => (search ? '0 16px 0 40px' : '0 16px')};
  border: 2px solid #e24347;
  border-radius: 25px;
  background-color: white;
`

export const InputWrapper = (props: Props) => (
  <Input
    autoCorrect={false}
    autoFocus
    keyboardAppearance="dark"
    clearButtonMode="always"
    placeholder={props.placeholder}
    onChangeText={props.handleChange}
    search={props.search}
    placeholderTextColor={props.placeholderTextColor}
  />
)

InputWrapper.defaultProps = {
  placeholder: 'test',
  value: '',
  handleChange: () => {},
  search: true,
  placeholderTextColor: iOSColors.lightGray,
}
