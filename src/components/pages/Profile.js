// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, Text } from 'react-native'
import {
  GrowContainer,
  Spinner,
  NavBar,
  Heading,
} from '../presentational/atoms'
import { SIGN_IN_MACHINE_ACTIONS } from '../container/SignIn/actions'
import styled from 'styled-components'

type PropTypes = {}

type StateTypes = {}

class Profile extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  handlePress = () => {
    this.props.signOut()
  }

  render() {
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <NavBar>
          <Heading color="black" font="xl">
            Profile
          </Heading>
        </NavBar>
        <GrowContainer justifyContent={'center'} alignItems={'center'}>
          <TouchableOpacity onPress={this.handlePress}>
            <Text>Text</Text>
          </TouchableOpacity>
        </GrowContainer>
      </GrowContainer>
    )
  }
}

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
