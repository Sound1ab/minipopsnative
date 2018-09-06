// @flow
import React, { Component } from 'react'
import { ScrollView } from 'react-native'

type PropTypes = {
  onEndReached: Function,
  horizontal: boolean,
  showsHorizontalScrollIndicator: boolean,
  style: Object,
  overflowHidden: boolean,
}

export class ScrollViewWrapper extends Component<PropTypes> {
  static defaultProps = {
    onEndReached: () => {},
    horizontal: false,
    showsHorizontalScrollIndicator: false,
    style: {},
    overflowHidden: false,
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
        style={{
          ...this.props.style,
          overflow: this.props.overflowHidden ? 'hidden' : '',
        }}
        horizontal={this.props.horizontal}
        showsHorizontalScrollIndicator={
          this.props.showsHorizontalScrollIndicator
        }
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
