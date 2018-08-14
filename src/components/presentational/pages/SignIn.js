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
      loading,
      validationErrors,
      handleCodeText,
      handleConfirmation,
      handleChangeText,
      handleSignIn,
    }) =>
      state.idle && state.idle === 'waitingForConfirmation' ? (
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
      )
    }
  </SignInContainer>
)
