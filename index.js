import React from 'react'
import Amplify from 'aws-amplify'
import config from './aws-exports'
import App from './src/components/App'
Amplify.configure(config)

const app = new App()

app.startLogin()
