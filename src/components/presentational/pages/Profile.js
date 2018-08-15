// @flow
import React from 'react'
import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components'
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
import get from 'lodash/get'

const HeadingWrapper = styled.View`
  flex: 1;
  padding: 16px;
`

const Section2 = styled.View`
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
  <ProfileContainer>
    {({ loading, signOut, showNotification, user, handlePushMyDetails }) => (
      <Screen
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
          <Row onPress={handlePushMyDetails.bind(null, { navigator })}>
            <IconWrapper>
              <Icon name="ios-options" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              My Details
            </Heading>
          </Row>
          <Row>
            <IconWrapper>
              <Icon name="ios-lock" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              Change Password
            </Heading>
          </Row>
          <Row>
            <IconWrapper>
              <Icon name="ios-megaphone" color={colors.primary} />
            </IconWrapper>
            <Heading size="l" color="black">
              Notifications
            </Heading>
          </Row>
          <Section2>
            <SignOutButton onPress={signOut}>
              <Heading size="l" color={colors.primary}>
                Sign Out
              </Heading>
            </SignOutButton>
          </Section2>
          <TabBarPlaceholder />
        </ScrollViewWrapper>
      </Screen>
    )}
  </ProfileContainer>
)
