// @flow
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { darkMode, lightMode } from '../../../theme'

type PropTypes = {
  navigator: {},
}

type StateTypes = {}

class Theme extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }

  render() {
    return (
      <ThemeProvider
        theme={this.props.theme === 'darkMode' ? darkMode : lightMode}
      >
        {this.props.children}
      </ThemeProvider>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.app.theme,
})

export default connect(mapStateToProps)(Theme)
