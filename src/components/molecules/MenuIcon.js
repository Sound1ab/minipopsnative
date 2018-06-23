// @flow
import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native'
import { Icon } from 'atoms'

type PropTypes = {}

type StateTypes = {}

export class MenuIcon extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }

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
