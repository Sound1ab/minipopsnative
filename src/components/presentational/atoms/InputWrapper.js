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
  autoFocus: Boolean,
}

const Input = styled.TextInput`
  width: 100%;
  color: ${iOSColors.black};
  height: 32px;
  padding: ${({ search }) => (search ? '0 16px 0 40px' : '0 16px')};
  border: 1px solid #e24347;
  border-radius: 25px;
  background-color: white;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '16px' : '0')};
`

export const InputWrapper = (props: Props) => (
  <Input
    autoCorrect={false}
    autoFocus={props.autoFocus}
    keyboardAppearance="dark"
    clearButtonMode="always"
    placeholder={props.placeholder}
    onChangeText={props.handleChange}
    search={props.search}
    placeholderTextColor={props.placeholderTextColor}
    marginBottom={props.marginBottom}
    value={props.value}
  />
)

InputWrapper.defaultProps = {
  placeholder: 'test',
  value: '',
  handleChange: () => {},
  search: false,
  placeholderTextColor: iOSColors.gray,
  marginBottom: false,
  autoFocus: false,
}
