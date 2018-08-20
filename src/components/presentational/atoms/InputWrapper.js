// @flow
import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { iOSColors } from 'react-native-typography'
import { colors } from '../../../theme'

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
  selectionColor: string,
  returnKeyType: string,
  handleSubmitEditing: ?Function,
  blurOnSubmit: Boolean,
  disabled: Boolean,
}

const Input = styled.TextInput`
  width: 100%;
  color: ${({ error }) => (error ? colors.error : colors.black)};
  height: 32px;
  padding: ${({ search }) => (search ? '0 16px 0 40px' : '0 16px')};
  border: 1px solid ${colors.secondary};
  ${({ disabled }) =>
    disabled &&
    css`
      border: 1px solid lightgray;
    `};
  ${({ error }) =>
    error &&
    css`
      border: 2px solid red;
    `};
  border-radius: 25px;
  background-color: white;
  margin-bottom: ${({ marginBottom }) => (marginBottom ? '16px' : '0')};
`

export class InputWrapper extends Component<Props> {
  static defaultProps = {
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
    selectionColor: colors.primary,
    returnKeyType: 'search',
    handleSubmitEditing: null,
    blurOnSubmit: true,
    disabled: false,
  }

  focus = () => {
    this.input.root.focus()
  }

  render() {
    return (
      <Input
        ref={input => (this.input = input)}
        autoCorrect={false}
        autoFocus={this.props.autoFocus}
        keyboardAppearance="dark"
        clearButtonMode="always"
        placeholder={this.props.placeholder}
        onChangeText={this.props.handleChange}
        search={this.props.search}
        placeholderTextColor={this.props.placeholderTextColor}
        marginBottom={this.props.marginBottom}
        value={this.props.value}
        secureTextEntry={this.props.password}
        error={this.props.error}
        autoCapitalize={this.props.autoCapitalize}
        keyboardType={this.props.keyboardType}
        selectionColor={this.props.selectionColor}
        returnKeyType={this.props.returnKeyType}
        onSubmitEditing={this.props.handleSubmitEditing}
        blurOnSubmit={this.props.blurOnSubmit}
        editable={!this.props.disabled}
        selectTextOnFocus={!this.props.disabled}
        disabled={this.props.disabled}
      />
    )
  }
}
