// @flow
import React from 'react'
import styled from 'styled-components'
import { Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { InputWrapper, Heading, Spinner } from '../../presentational/atoms'
import { colors } from '../../../theme'

type PropTypes = {
  code: string,
  validationErrors: Array<string>,
  handleChangeText: Function,
  handleSubmit: Function,
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

export const SignInConfirmation = ({
  handleChangeText,
  code,
  validationErrors,
  handleSubmit,
  loading,
}) => (
  <TouchWrapper onPress={() => Keyboard.dismiss()}>
    <Wrapper>
      <Section>
        <Spinner
          key={`spinner-${props.loading}`}
          size={60}
          iterationCount={loading ? 'infinite' : 2}
        />
      </Section>
      <Section>
        <Heading size="xl" color={colors.black}>
          MFA
        </Heading>
        <Heading size="l" color={colors.gray}>
          Confirm using the code sent via sms
        </Heading>
      </Section>
      <Section>
        <InputWrapper
          handleChange={handleChangeText.bind(null, 'code')}
          value={code}
          autoCapitalize="none"
          error={validationErrors.includes('code')}
          placeholder="confirmation code"
          handleSubmitEditing={handleSubmit}
        />
      </Section>
      <TouchableOpacity onPress={handleSubmit}>
        <Heading size="l" color={colors.primary}>
          Confirm code
        </Heading>
      </TouchableOpacity>
    </Wrapper>
  </TouchWrapper>
)

SignInConfirmation.defaultProps = {
  code: '',
  validationErrors: [],
  handleChangeText: () => {},
  handleSubmit: () => {},
}
