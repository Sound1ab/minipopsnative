// @flow
import React, { Component } from 'react'
import { View, Text } from 'react-native'

type PropTypes = {}

type StateTypes = {}

export class Drawer extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }

  render() {
    return (
      <View>
        <Text>hey</Text>
      </View>
    )
  }
}
