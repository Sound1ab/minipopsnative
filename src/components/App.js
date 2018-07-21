// @flow
import React, { Component } from 'react'
import { Navigation } from 'react-native-navigation'
import { Auth } from 'aws-amplify'
import store from '../store/index'
import { Provider } from 'react-redux'

import { Login } from './pages/Login'
import Search from './pages/Search'
import Discovery from './pages/Discovery'

type PropTypes = {}

type StateTypes = {}

class App extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
    this.registerComponents()
  }
  state = {}

  registerComponents = () => {
    const register = new Map([
      ['Login', Login],
      ['Search', Search],
      ['Discovery', Discovery],
    ])

    register.forEach((Component, key) => {
      Navigation.registerComponent(key, () => Component, store, Provider)
    })
  }

  signOut = async () => {
    try {
      const currentUser = await Auth.currentAuthenticatedUser()
      await currentUser.signOut()
    } catch (error) {
      console.log(error)
    }
  }

  startLogin = () => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          screen: 'Login',
          label: 'login',
          passProps: {
            form: 'signIn',
          },
        },
        {
          screen: 'Login',
          label: 'SignUp',
          passProps: {
            form: 'signUp',
          },
        },
      ],
      tabsStyle: {
        tabBarButtonColor: '#ff6f72',
        tabBarSelectedButtonColor: '#e24347',
        tabBarBackgroundColor: '#ffffff',
        initialTabIndex: 0,
      },
      appStyle: {
        navBarHidden: true,
      },
    })
  }

  startApp = () => {
    Navigation.startTabBasedApp({
      tabs: [
        {
          label: 'Search',
          screen: 'Search',
          title: 'Search',
        },
        {
          label: 'Discovery',
          screen: 'Discovery',
          title: 'Discovery',
        },
      ],
      tabsStyle: {
        tabBarButtonColor: '#ff6f72',
        tabBarSelectedButtonColor: '#e24347',
        tabBarBackgroundColor: '#ffffff',
        initialTabIndex: 0,
      },
      appStyle: {
        navBarHidden: true,
      },
    })
  }
}

export default App
