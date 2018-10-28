// @flow
import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { TouchableOpacity } from 'react-native'
import {
  InputWrapper,
  Heading,
  Spinner,
  TabBarPlaceholder,
} from '../../presentational/atoms'

type PropTypes = {
  code: string,
  validationErrors: Array<string>,
  handleChangeText: Function,
  handleSubmit: Function,
}

const Wrapper = styled.View`
  height: ${Dimensions.get('window').height};
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
`

const Section = styled.View`
  margin-bottom: 32px;
  width: 100%;
`

export const SignUpConfirmation = (props: PropTypes) => (
  <Wrapper>
    <Section>
      <Spinner
        key={`spinner-${props.loading}`}
        size={60}
        iterationCount={props.loading ? 'infinite' : 2}
      />
    </Section>
    <Section>
      <Heading size="xl">Confirmation</Heading>
      <Heading size="l">Confirm using the email code</Heading>
    </Section>
    <Section>
      <InputWrapper
        handleChange={props.handleChangeText.bind(null, 'code')}
        value={props.code}
        autoCapitalize="none"
        error={props.validationErrors.includes('code')}
        placeholder="confirmation code"
        handleSubmitEditing={props.handleSubmit}
      />
    </Section>
    <TouchableOpacity onPress={props.handleSubmit}>
      <Heading size="l">Confirm code</Heading>
    </TouchableOpacity>
    <TabBarPlaceholder />
  </Wrapper>
)

SignUpConfirmation.defaultProps = {
  code: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
