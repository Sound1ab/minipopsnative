// @flow
import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity } from 'react-native'
import { Functional } from '../../../helpers'
import { popScreen } from '../../../navigation'
import { MyDetailsContainer } from '../../container'
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

export const MyDetails = ({ navigator }: PropTypes) => (
  <MyDetailsContainer>
    {({
      loading,
      user,
      handleChangeText,
      handleSaveUserAttributes,
      form,
      validationErrors,
    }) => (
      <Screen
        loading={loading}
        handleBack={popScreen.bind(null, navigator)}
        heading={{
          value: 'My Details',
          color: 'black',
          size: 'l',
          marginBottom: false,
        }}
      >
        <GrowContainerWrapper>
          <InputWrapper
            handleChange={handleChangeText.bind(null, 'email')}
            value={form.email}
            autoCapitalize="none"
            placeholder="email"
            marginBottom
            error={validationErrors.includes('email')}
          />
          <InputWrapper
            handleChange={handleChangeText.bind(null, 'phone_number')}
            value={form.phone_number}
            autoCapitalize="none"
            placeholder="Phone number"
            marginBottom
            error={validationErrors.includes('phone_number')}
          />
          <TouchableOpacity
            onPress={Functional.pipe(
              handleSaveUserAttributes,
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
  </MyDetailsContainer>
)

MyDetails.defaultProps = {}

export default MyDetails
