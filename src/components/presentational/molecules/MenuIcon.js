// @flow
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from '../atoms/index'

export class MenuIcon extends Component {
  handlePress = () => {
    this.props.navigator.toggleDrawer({
      side: 'left',
      animated: true,
    })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Icon name="menu" size={30} />
      </TouchableOpacity>
    )
  }
}
