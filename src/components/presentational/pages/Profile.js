// @flow
import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import {
  GrowContainer,
  Button,
  TabBarPlaceholder,
  Heading,
  Icon,
  MinipopsIcon,
} from '../atoms'
import { colors } from '../../../theme'
import get from 'lodash/get'

const toggleTabs = navigator => {
  navigator.toggleTabs({
    to: 'hidden',
    animate: true,
  })
}

const toggleTabsShow = navigator => {
  navigator.toggleTabs({
    to: 'visible',
    animate: true,
  })
}

const Section1 = styled.View`
  flex: 1;
  padding: 16px;
`

const Section2 = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`

const Section3 = styled.View`
  flex: 2;
  justify-content: center;
  align-items: center;
  background-color: ${colors.primary};
`

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const SignOutButton = styled.TouchableOpacity`
  margin: 16px;
`

export const Profile = ({ navigator }) => (
  <ProfileContainer>
    {({ loading, signOut, showNotification, user }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Profile',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        <GrowContainer>
          <Section3>
            <MinipopsIcon size={124} />
          </Section3>
          <Section1>
            <Heading size="xl" color="black" marginBottom>
              {get(user, ['username'])}
            </Heading>
            <Row>
              <Icon name="ios-mail" margin="0 8px 0 0" color={colors.primary} />
              <Heading size="l" color="black">
                {get(user, ['attributes', 'email'])}
              </Heading>
            </Row>
            <Row>
              <Icon name="ios-call" margin="0 8px 0 0" color={colors.primary} />
              <Heading size="l" color="black">
                {get(user, ['attributes', 'phone_number'])}
              </Heading>
            </Row>
          </Section1>
          <Section2>
            <SignOutButton onPress={signOut}>
              <Heading size="l" color={colors.primary}>
                Sign Out
              </Heading>
            </SignOutButton>
          </Section2>
          <TabBarPlaceholder />
        </GrowContainer>
      </Screen>
    )}
  </ProfileContainer>
)
