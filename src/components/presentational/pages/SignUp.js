// @flow
import React from 'react'
import { SignUpContainer } from '../../container/index'
import { SignUpForm, SignUpConfirmation } from '../organisms/index'

export const SignUp = () => (
  <SignUpContainer>
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
    }) =>
      state === 'confirmingUser' ||
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
      )
    }
  </SignUpContainer>
)
