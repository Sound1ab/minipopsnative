// @flow
import React from 'react'
import { SignInContainer } from '../../container/index'
import { SignInForm, SignInConfirmation } from '../organisms/index'

export const SignIn = () => (
  <SignInContainer>
    {({
      state,
      confirmation,
      form,
      validationErrors,
      handleCodeText,
      handleConfirmation,
      handleChangeText,
      handleSignIn,
    }) =>
      state.idle && state.idle === 'waitingForConfirmation' ? (
        <SignInConfirmation
          code={confirmation.code}
          validationErrors={validationErrors}
          handleChangeText={handleCodeText}
          handleSubmit={handleConfirmation}
        />
      ) : (
        <SignInForm
          username={form.username}
          password={form.password}
          validationErrors={validationErrors}
          handleChangeText={handleChangeText}
          handleSubmit={handleSignIn}
        />
      )
    }
  </SignInContainer>
)
