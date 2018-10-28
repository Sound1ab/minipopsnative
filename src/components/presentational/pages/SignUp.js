// @flow
import React, { Component } from 'react'
import { Keyboard } from 'react-native'
import { SignUpContainer } from '../../container'
import { SignUpForm, SignUpConfirmation } from '../organisms'
import { Screen, Theme } from '../templates'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export class SignUp extends Component<{ navigator: * }> {
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
    let { navigator } = this.props
    return (
      <Theme navigator={this.props.navigator}>
        <Screen navigator={this.props.navigator}>
          {() => (
            <SignUpContainer navigator={navigator}>
              {({
                state,
                confirmation,
                form,
                loading,
                validationErrors,
                handleCodeText,
                handleConfirmation,
                handleChangeText,
                handleSignUp,
                code,
              }) => (
                <KeyboardAwareScrollView
                  keyboardShouldPersistTaps={'never'}
                  scrollEnabled={this.state.isKeyboardShowing}
                  style={{ flex: 1 }}
                  viewIsInsideTabBar
                >
                  {state === 'confirmingUser' ||
                  (state.idle && state.idle === 'waitingForConfirmation') ? (
                    <SignUpConfirmation
                      loading={loading}
                      code={code}
                      validationErrors={validationErrors}
                      handleChangeText={handleCodeText}
                      handleSubmit={handleConfirmation}
                    />
                  ) : (
                    <SignUpForm
                      loading={loading}
                      username={form.username}
                      password={form.password}
                      phone_number={form.phone_number}
                      email={form.email}
                      validationErrors={validationErrors}
                      handleChangeText={handleChangeText}
                      handleSubmit={handleSignUp}
                    />
                  )}
                </KeyboardAwareScrollView>
              )}
            </SignUpContainer>
          )}
        </Screen>
      </Theme>
    )
  }
}
