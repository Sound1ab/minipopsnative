// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { InputWrapper, Heading } from '../../presentational/atoms'
import { colors } from '../../../Theme'

type PropTypes = {
  code: string,
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

export const SignUpConfirmation = (props: PropTypes) => (
  <Wrapper>
    <Section>
      <Heading font="xl" color={colors.black}>
        Confirmation
      </Heading>
      <Heading font="l" color={colors.gray}>
        Confirm using the code sent via sms
      </Heading>
    </Section>
    <Section>
      <InputWrapper
        handleChange={props.handleChangeText.bind(null, 'code')}
        value={props.code}
        autoFocus
        autoCapitalize="none"
        error={props.validationErrors.includes('code')}
        placeholder="confirmation code"
      />
    </Section>
    <TouchableOpacity onPress={props.handleSubmit}>
      <Heading font="l" color={colors.primary}>
        Confirm code
      </Heading>
    </TouchableOpacity>
  </Wrapper>
)

SignUpConfirmation.defaultProps = {
  code: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
