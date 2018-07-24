import React from 'react'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import { Auth } from 'aws-amplify'
import store from './src/store/index'
import { APP_MACHINE_ACTIONS } from './src/components/container/App/actions'
Amplify.configure(config)

const signOut = async () => {
  try {
    const currentUser = await Auth.currentAuthenticatedUser()
    await currentUser.signOut()
  } catch (error) {
    console.log(error)
  }
}

signOut()
store.dispatch(APP_MACHINE_ACTIONS.INIT())
