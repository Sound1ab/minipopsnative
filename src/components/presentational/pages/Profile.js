// @flow
import React, { Fragment } from 'react'
import get from 'lodash/get'
import styled from 'styled-components'
import { Dimensions } from 'react-native'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import { Row } from '../molecules'
import { pushScreen } from '../../../navigation'
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
      <Screen navigator={navigator}>
        {({ navigateTo }) => (
          <Fragment>
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
                handleOnPress={navigateTo.bind(null, {
                  screen: 'MyDetails',
                  title: 'My Details',
                  passProps: {
                    user: user,
                  },
                })}
                heading={'My Details'}
                icon={'ios-options'}
              />
              <Row
                handleOnPress={navigateTo.bind(null, {
                  screen: 'ChangePassword',
                  title: 'Change Password',
                  passProps: {
                    user: user,
                  },
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
                  <Heading
                    size="l"
                    color={isOnline ? colors.primary : colors.gray}
                  >
                    Sign Out
                  </Heading>
                </SignOutButton>
              </SignOutWrapper>
              <TabBarPlaceholder />
            </ScrollViewWrapper>
          </Fragment>
        )}
      </Screen>
    )}
  </ProfileContainer>
)
