// @flow
import React from 'react'
import { ProfileContainer } from '../../container/index'
import { GrowContainer, NavBar, Heading, Button } from '../atoms/index'

export const Profile = () => (
  <ProfileContainer>
    {({ signOut }) => (
      <React.Fragment>
        <NavBar>
          <Heading color="black" size="xl">
            Profile
          </Heading>
        </NavBar>
        <GrowContainer justifyContent={'center'} alignItems={'center'}>
          <Button title="Sign Out" handlePress={signOut} />
        </GrowContainer>
      </React.Fragment>
    )}
  </ProfileContainer>
)
