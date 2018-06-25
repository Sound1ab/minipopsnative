// @flow
import React, { Component } from 'react'

import { leftButtons } from 'navigation'

type PropTypes = {
  navigator: Object,
  render: Function,
}

export class NavigationButton extends Component<PropTypes> {
  static defaultProps = {
    navigator: {},
    render: () => {},
  }
  constructor(props: PropTypes) {
    super(props)
    const { navigator } = this.props
    navigator.setButtons(leftButtons(navigator))
  }

  render() {
    const { render, navigator } = this.props
    return render(navigator)
  }
}
