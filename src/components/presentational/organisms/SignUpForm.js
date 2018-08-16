// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { InputWrapper, Heading, Spinner } from '../../presentational/atoms'
import { colors } from '../../../theme'

type PropTypes = {
  username: string,
  password: string,
  phone_number: string,
  email: string,
  validationErrors: Array<string>,
  handleChangeText: Function,
  handleSubmit: Function,
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
`

const Section = styled.View`
  margin-bottom: 32px;
  width: 100%;
`

export const SignUpForm = (props: PropTypes) => (
  <Wrapper>
    <Section>
      <Spinner
        key={`spinner-${props.loading}`}
        size={60}
        iterationCount={props.loading ? 'infinite' : 2}
      />
    </Section>
    <Section>
      <Heading size="xl" color={colors.black}>
        Welcome
      </Heading>
      <Heading size="l" color={colors.gray}>
        Sign up to continue
      </Heading>
    </Section>
    <Section>
      <InputWrapper
        handleChange={props.handleChangeText.bind(null, 'username')}
        value={props.username}
        marginBottom
        autoCapitalize="none"
        error={props.validationErrors.includes('username')}
        placeholder="username"
        returnKeyType="next"
        handleSubmitEditing={() => this.passwordInput.focus()}
      />
      <InputWrapper
        ref={passwordInput => (this.passwordInput = passwordInput)}
        handleChange={props.handleChangeText.bind(null, 'password')}
        value={props.password}
        marginBottom
        password
        autoCapitalize="none"
        error={props.validationErrors.includes('password')}
        placeholder="password"
        returnKeyType="next"
        handleSubmitEditing={() => this.phoneNumberInput.focus()}
      />
      <InputWrapper
        ref={phoneNumberInput => (this.phoneNumberInput = phoneNumberInput)}
        handleChange={props.handleChangeText.bind(null, 'phone_number')}
        value={props.phone_number}
        marginBottom
        autoCapitalize="none"
        error={props.validationErrors.includes('phone_number')}
        placeholder="+4412345678987"
        keyboardType="numeric"
        returnKeyType="next"
        handleSubmitEditing={() => this.emailInput.focus()}
      />
      <InputWrapper
        ref={emailInput => (this.emailInput = emailInput)}
        handleChange={props.handleChangeText.bind(null, 'email')}
        value={props.email}
        placeholder="email@email.com"
        autoCapitalize="none"
        error={props.validationErrors.includes('email')}
        keyboardType="email-address"
        returnKeyType="go"
        handleSubmitEditing={props.handleSubmit}
      />
    </Section>
    <TouchableOpacity onPress={props.handleSubmit}>
      <Heading size="l" color={colors.primary}>
        Sign Up
      </Heading>
    </TouchableOpacity>
  </Wrapper>
)

SignUpForm.defaultProps = {
  username: '',
  password: '',
  phone_number: '',
  email: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
