// @flow
import React from 'react'
import { connect } from 'react-redux'
import SignUp from '../container/SignUp'
import SignIn from '../container/SignIn'
import { GrowContainer, Spinner } from '../presentational/atoms'

type PropTypes = {
  loading: Boolean,
  navigator: Object,
  form: String,
}

const forms = {
  signUp: navigator => <SignUp navigator={navigator} />,
  signIn: navigator => <SignIn navigator={navigator} />,
}

const Login = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
    {forms[props.form](props.navigator)}
  </GrowContainer>
)

const mapStateToProps = state => ({
  loading: state.app.loading,
})

export default connect(mapStateToProps)(Login)
