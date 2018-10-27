// @flow
import React from 'react'
import { Dimensions, TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import {
  Heading,
  InputWrapper,
  Spinner,
  TabBarPlaceholder,
} from '../../presentational/atoms'
import { colors } from '../../../theme'

type PropTypes = {
  username: string,
  password: string,
}

const Wrapper = styled.View`
  flex: 1;
  height: ${Dimensions.get('window').height};
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
`

const Section = styled.View`
  margin-bottom: 32px;
  width: 100%;
`

export function SignInForm(props: PropTypes) {
  return (
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
        <Heading size="l" color={colors.darkGrey}>
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
      <TabBarPlaceholder />
    </Wrapper>
  )
}

SignInForm.defaultProps = {
  username: '',
  password: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
