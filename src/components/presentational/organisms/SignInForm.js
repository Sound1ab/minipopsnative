// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { InputWrapper, Heading, Spinner } from '../../presentational/atoms'
import { colors } from '../../../theme'

type PropTypes = {
  username: string,
  password: string,
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

export const SignInForm = (props: PropTypes) => (
  <Wrapper>
    <Section>
      <Spinner size={60} iterationCount={3} />
    </Section>
    <Section>
      <Heading size="xl" color={colors.black}>
        Welcome
      </Heading>
      <Heading size="l" color={colors.gray}>
        Sign in to continue
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
        handleSubmitEditing={() => this.passwordField.focus()}
        blurOnSubmit={false}
      />
      <InputWrapper
        ref={ref => (this.passwordField = ref)}
        handleChange={props.handleChangeText.bind(null, 'password')}
        value={props.password}
        password
        autoCapitalize="none"
        error={props.validationErrors.includes('password')}
        placeholder="password"
        returnKeyType="go"
        handleSubmitEditing={props.handleSubmit}
      />
    </Section>
    <TouchableOpacity onPress={props.handleSubmit}>
      <Heading size="l" color={colors.primary}>
        Sign In
      </Heading>
    </TouchableOpacity>
  </Wrapper>
)

SignInForm.defaultProps = {
  username: '',
  password: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
