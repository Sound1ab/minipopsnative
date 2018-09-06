// @flow
import React from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import { Row } from '../molecules'
import {
  TabBarPlaceholder,
  Heading,
  MinipopsIcon,
  ScrollViewWrapper,
} from '../atoms'
import { colors } from '../../../theme'

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
            handleOnPress={handlePushMyScreen.bind(null, {
              navigator,
              screen: 'MyDetails',
            })}
            heading={'My Details'}
            icon={'ios-options'}
          />
          <Row
            handleOnPress={handlePushMyScreen.bind(null, {
              navigator,
              screen: 'ChangePassword',
            })}
            heading={'Change Password'}
            icon={'ios-lock'}
          />
          <Row
            handleOnPress={CheckNotificationPermissions}
            heading={'Notifications'}
            icon={'ios-megaphone'}
          />
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
