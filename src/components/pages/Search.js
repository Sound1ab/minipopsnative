// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import SearchField from '../container/SearchField'

type PropTypes = {}

type StateTypes = {}

export class Search extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  render() {
    return (
      <View>
        <SearchField />
        <Text>hello there</Text>
      </View>
    )
  }
}
