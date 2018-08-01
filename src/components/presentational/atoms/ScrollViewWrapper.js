// @flow
import React, { Component } from 'react'
import { ScrollView } from 'react-native'

type PropTypes = {
  onEndReached: Function,
}

export class ScrollViewWrapper extends Component<PropTypes> {
  static defaultProps = {
    onEndReached: () => {},
  }

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  render() {
    return (
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (this.isCloseToBottom(nativeEvent)) {
            this.props.onEndReached()
          }
        }}
        scrollEventThrottle={400}
      >
        {this.props.children}
      </ScrollView>
    )
  }
}
