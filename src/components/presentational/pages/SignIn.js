// @flow
import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { SignInContainer } from '../../container'
import { SignInForm, SignInConfirmation } from '../organisms'
import { Screen, Theme } from '../templates'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class SignIn extends Component {
  state = {
    isKeyboardShowing: false,
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this.keyboardDidShow,
    )
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this.keyboardDidHide,
    )
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  keyboardDidShow = () => {
    this.setState({
      isKeyboardShowing: true,
    })
  }

  keyboardDidHide = () => {
    this.setState({
      isKeyboardShowing: false,
    })
  }

  render() {
    return (
      <Theme navigator={this.props.navigator}>
        <Screen navigator={this.props.navigator}>
          {() => (
            <SignInContainer>
              {({
                state,
                confirmation,
                form,
                loading,
                validationErrors,
                handleCodeText,
                handleConfirmation,
                handleChangeText,
                handleSignIn,
              }) => (
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={'never'}
                  scrollEnabled={this.state.isKeyboardShowing}
                  style={{ flex: 1 }}
                  viewIsInsideTabBar
                >
                  {state.idle && state.idle === 'waitingForConfirmation' ? (
                    <SignInConfirmation
                      loading={loading}
                      code={confirmation.code}
                      validationErrors={validationErrors}
                      handleChangeText={handleCodeText}
                      handleSubmit={handleConfirmation}
                    />
                  ) : (
                    <SignInForm
                      loading={loading}
                      username={form.username}
                      password={form.password}
                      validationErrors={validationErrors}
                      handleChangeText={handleChangeText}
                      handleSubmit={handleSignIn}
                    />
                  )}
                </KeyboardAwareScrollView>
              )}
            </SignInContainer>
          )}
        </Screen>
      </Theme>
    )
  }
}
