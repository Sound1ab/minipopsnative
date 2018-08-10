// @flow
import React from 'react'
import { ProfileContainer } from '../../container'
import { Screen } from '../templates'
import { GrowContainer, Button } from '../atoms'

export const Profile = () => (
  <ProfileContainer>
    {({ loading, signOut }) => (
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
          <Button title="Sign Out" handlePress={signOut} />
        </GrowContainer>
      </Screen>
    )}
  </ProfileContainer>
)
