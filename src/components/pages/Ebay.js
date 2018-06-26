// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { leftButtons } from 'navigation'

type PropTypes = {}

type StateTypes = {}

export class Ebay extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
    const { navigator } = this.props
    navigator.setButtons(leftButtons(navigator))
  }
  state = {}

  render() {
    return (
      <View>
        <Text>hello there</Text>
      </View>
    )
  }
}
