// @flow
import React from 'react'
import { Keyboard } from 'react-native'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { InputWrapper, Heading, Spinner } from '../../presentational/atoms'
import { colors } from '../../../theme'

type PropTypes = {
  username: string,
  password: string,
}

const TouchWrapper = styled.TouchableWithoutFeedback`
  flex: 1;
`

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
  <TouchWrapper onPress={() => Keyboard.dismiss()}>
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
  </TouchWrapper>
)

SignInForm.defaultProps = {
  username: '',
  password: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
