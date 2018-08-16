// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Functional } from '../../../helpers'
import { popScreen } from '../../../navigation'
import { ChangePasswordContainer } from '../../container'
import { Screen } from '../templates'
import { Heading, TabBarPlaceholder, InputWrapper } from '../atoms'
import { colors } from '../../../theme'

type PropTypes = {}

const GrowContainerWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding: 16px;
`

export const ChangePassword = ({ navigator }: PropTypes) => (
  <ChangePasswordContainer>
    {({
      loading,
      user,
      handleChangeText,
      handleUpdatePassword,
      form,
      validationErrors,
    }) => (
      <Screen
        loading={loading}
        handleBack={popScreen.bind(null, navigator)}
        heading={{
          value: 'Change Password',
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
        <GrowContainerWrapper>
          <InputWrapper
            handleChange={handleChangeText.bind(null, 'currentPassword')}
            value={form.currentPassword}
            autoCapitalize="none"
            placeholder="Current password"
            password
            marginBottom
          />
          <InputWrapper
            handleChange={handleChangeText.bind(null, 'password')}
            value={form.password}
            autoCapitalize="none"
            placeholder="New Password"
            marginBottom
            password
            error={validationErrors.includes('password')}
          />
          <TouchableOpacity
            onPress={Functional.pipe(
              handleUpdatePassword,
              popScreen.bind(null, navigator),
            )}
          >
            <Heading size="l" color={colors.primary}>
              Save
            </Heading>
          </TouchableOpacity>
        </GrowContainerWrapper>
        <TabBarPlaceholder />
      </Screen>
    )}
  </ChangePasswordContainer>
)

ChangePassword.defaultProps = {}
