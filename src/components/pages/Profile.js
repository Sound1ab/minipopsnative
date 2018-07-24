// @flow
import React from 'react'
import { connect } from 'react-redux'
import {
  GrowContainer,
  Spinner,
  NavBar,
  Heading,
  Button,
} from '../presentational/atoms'
import { SIGN_IN_MACHINE_ACTIONS } from '../container/SignIn/actions'

type PropTypes = {
  loading: Boolean,
  signOut: Function,
}

const Profile = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
    <NavBar>
      <Heading color="black" font="xl">
        Profile
      </Heading>
    </NavBar>
    <GrowContainer justifyContent={'center'} alignItems={'center'}>
      <Button handlePress={props.signOut} />
    </GrowContainer>
  </GrowContainer>
)

const mapStateToProps = state => ({
  loading: state.app.loading,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(SIGN_IN_MACHINE_ACTIONS.SIGN_OUT())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
