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
import { LOGIN_MACHINE_ACTIONS } from '../../machines/Login/actions'

type PropTypes = {
  loading: Boolean,
  signOut: Function,
}

const Profile = (props: PropTypes) => props.children(props)

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(LOGIN_MACHINE_ACTIONS.SIGN_OUT())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile)
