// @flow
import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { connect } from 'react-redux'
import { darkMode, lightMode } from '../../../theme'
import { LayoutAnimation } from 'react-native'

type PropTypes = {
  navigator: {},
}

type StateTypes = {}

class Theme extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }

  setNavigatorStyles(theme) {
    let colors = theme === 'darkMode' ? darkMode : lightMode
    this.props.navigator.setStyle({
      tabBarButtonColor: colors.primary,
      tabBarBackgroundColor: colors.background,
      navBarTextColor: colors.text,
      navBarSubtitleColor: colors.text,
      navBarBackgroundColor: colors.background,
      screenBackgroundColor: colors.background,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.theme !== prevProps.theme) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      this.setNavigatorStyles(this.props.theme)
    }
  }

  componentWillMount() {
    this.setNavigatorStyles(this.props.theme)
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
