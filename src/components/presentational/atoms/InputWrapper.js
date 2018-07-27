// @flow
import React from 'react'
import styled from 'styled-components'
import { iOSColors } from 'react-native-typography'
import { colors } from '../../../Theme'

type Props = {
  placeholder: string,
  value: string,
  handleChange: Function,
  search: string,
  placeholderTextColor: string,
  autoFocus: Boolean,
  password: Boolean,
  error: Boolean,
  autoCapitalize: String,
  keyboardType: String,
}

const Input = styled.TextInput`
  width: 100%;
  color: ${({ error }) => (error ? colors.error : colors.black)};
  height: 32px;
  padding: ${({ search }) => (search ? '0 16px 0 40px' : '0 16px')};
  border: ${({ error }) => (error ? '2px' : '1px')} solid
    ${({ error }) => (error ? colors.error : colors.secondary)};
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
    secureTextEntry={props.password}
    error={props.error}
    autoCapitalize={props.autoCapitalize}
    keyboardType={props.keyboardType}
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
  password: false,
  error: false,
  autoCapitalize: 'sentences',
  keyboardType: 'default',
}
