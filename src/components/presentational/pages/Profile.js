// @flow
import React from 'react'
import get from 'lodash/get'
import styled, { css } from 'styled-components'
import { Dimensions } from 'react-native'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import {
  TabBarPlaceholder,
  Heading,
  Icon,
  MinipopsIcon,
  ScrollViewWrapper,
} from '../atoms'
import { colors, shadow } from '../../../theme'

const HeadingWrapper = styled.View`
  flex: 1;
  padding: 16px;
`

const SignOutWrapper = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`

const ImageHeader = styled.View`
  width: 100%;
  height: ${Dimensions.get('window').width};
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
`

const Row = styled.TouchableOpacity`
  height: 60;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 8px 8px 8px;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

const IconWrapper = styled.View`
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
`

const SignOutButton = styled.TouchableOpacity`
  margin: 16px;
`

export const Profile = ({ navigator }) => (
  <ProfileContainer navigator={navigator}>
    {({
      loading,
      signOut,
      showNotification,
      user,
      handlePushMyScreen,
      CheckNotificationPermissions,
      isOnline,
    }) => (
      <Screen
        navigator={navigator}
        loading={loading}
        heading={{
          value: 'Profile',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        <ScrollViewWrapper>
          <ImageHeader>
            <MinipopsIcon size={124} />
          </ImageHeader>
          <HeadingWrapper>
            <Heading size="xl" color="black" marginBottom>
              {get(user, ['username'])}
            </Heading>
          </HeadingWrapper>
          <Row
            onPress={handlePushMyScreen.bind(null, {
              navigator,
              screen: 'MyDetails',
            })}
          >
            <IconWrapper>
              <Icon name="ios-options" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              My Details
            </Heading>
          </Row>
          <Row
            onPress={handlePushMyScreen.bind(null, {
              navigator,
              screen: 'ChangePassword',
            })}
          >
            <IconWrapper>
              <Icon name="ios-lock" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              Change Password
            </Heading>
          </Row>
          <Row onPress={CheckNotificationPermissions}>
            <IconWrapper>
              <Icon name="ios-megaphone" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              Notifications
            </Heading>
          </Row>
          <SignOutWrapper>
            <SignOutButton
              onPress={() => {
                isOnline && signOut()
              }}
            >
              <Heading size="l" color={isOnline ? colors.primary : colors.gray}>
                Sign Out
              </Heading>
            </SignOutButton>
          </SignOutWrapper>
          <TabBarPlaceholder />
        </ScrollViewWrapper>
      </Screen>
    )}
  </ProfileContainer>
)
