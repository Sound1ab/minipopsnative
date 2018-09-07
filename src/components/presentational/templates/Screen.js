// @flow
import React, { Component } from 'react'
import { Linking } from 'react-native'

type PropTypes = {
  children: Function,
}

export class Screen extends Component<PropTypes> {
  static defaultProps = {
    children: () => {},
  }

  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.isVisible = false
    this.navigated = null
  }

  onNavigatorEvent = event => {
    switch (event.id) {
      case 'willAppear':
        this.isVisible = true
        break
      case 'didAppear':
        this.forceUpdate()
        break
      case 'didDisappear':
        this.isVisible = false
        this.navigated = null
        break
    }
  }

  shouldComponentUpdate = () => {
    return this.isVisible
  }

  navigateTo = screenOptions => {
    if (!this.navigated) {
      this.props.navigator.push(screenOptions)
    }

    this.navigated = true
  }

  openUrl = url => {
    if (url) {
      try {
        Linking.openURL(url)
      } catch (error) {
        console.error(`error opening link: ${error}`)
      }
    }
  }

  render() {
    return this.props.children({
      navigateTo: this.navigateTo,
      openUrl: this.openUrl,
    })
  }
}

export default Screen
