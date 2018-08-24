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
  <MyDetailsContainer navigator={navigator}>
    {({
      loading,
      user,
      handleChangeText,
      handleSaveUserAttributes,
      form,
      validationErrors,
      isOnline,
    }) => (
      <Screen
        navigator={navigator}
        noLoading
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
            returnKeyType="next"
            handleSubmitEditing={() => this.phone_number.focus()}
            blurOnSubmit={false}
            disabled={!isOnline}
          />
          <InputWrapper
            ref={ref => (this.phone_number = ref)}
            handleChange={handleChangeText.bind(null, 'phone_number')}
            value={form.phone_number}
            autoCapitalize="none"
            placeholder="Phone number"
            marginBottom
            error={validationErrors.includes('phone_number')}
            returnKeyType="go"
            handleSubmitEditing={handleSaveUserAttributes}
            disabled={!isOnline}
          />
          <TouchableOpacity
            onPress={() => {
              isOnline && handleSaveUserAttributes()
            }}
          >
            <Heading size="l" color={isOnline ? colors.primary : colors.gray}>
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
