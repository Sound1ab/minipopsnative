// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { View } from 'react-native'

type PropTypes = {
  data: Array<any>,
  dripSize: number,
}

type StateTypes = {}

export class LazyDrip extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    data: [],
    dripSize: 2,
  }

  componentDidUpdate(prevProps) {
    if (this.props.data !== prevProps.data) {
      this.fillDrip()
    }
  }

  state = {
    drip: [],
    count: 0,
  }

  fillDrip = () => {
    const portion = this.props.data.slice(
      0,
      this.props.dripSize * this.state.count - 1,
    )
    this.setState({ drip: portion, count: (this.state.count += 1) })
  }

  render() {
    return (
      <React.Fragment>
        {this.props.children({
          requestMore: this.fillDrip,
          data: this.state.drip,
        })}
      </React.Fragment>
    )
  }
}

export default LazyDrip
