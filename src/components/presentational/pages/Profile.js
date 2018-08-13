// @flow
import React from 'react'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import { GrowContainer, Button, TabBarPlaceholder } from '../atoms'

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

export const Profile = ({ navigator }) => (
  <ProfileContainer>
    {({ loading, signOut, showNotification }) => (
      <Screen
        loading={loading}
        heading={{
          value: 'Profile',
          color: 'black',
          size: 'xl',
          marginBottom: false,
        }}
      >
        <GrowContainer justifyContent={'center'} alignItems={'center'}>
          <Button
            title="Sign Out"
            handlePress={toggleTabs.bind(null, navigator)}
          />
          <Button
            title="Sign Out"
            handlePress={toggleTabsShow.bind(null, navigator)}
          />
          <TabBarPlaceholder />
        </GrowContainer>
      </Screen>
    )}
  </ProfileContainer>
)
