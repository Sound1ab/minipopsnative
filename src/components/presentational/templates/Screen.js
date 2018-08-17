// @flow
import React, { Component } from 'react'
import { SearchField } from '../../container'
import styled from 'styled-components'
import { NavBar } from '../molecules'

type PropTypes = {
  loading: Boolean,
  handleBack: ?Function,
  state: ?{
    currentState: string | Object,
    loadingState: string,
  },
  heading: {
    value: string,
    color: string,
    size: string,
    marginBottom: Boolean,
  },
  searchApi: ?string,
  children: Function,
}

const Sink = styled.View`
  flex: 1;
  z-index: -1;
`

export class Screen extends Component<PropTypes> {
  static defaultProps = {
    loading: false,
    handleBack: null,
    state: null,
    heading: {
      value: '',
      color: 'black',
      size: 'xl',
      marginBottom: false,
    },
    searchApi: null,
    children: () => {},
  }
  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.isVisible = false
  }
  onNavigatorEvent = event => {
    switch (event.id) {
      case 'willAppear':
        this.isVisible = true
        break
      case 'didAppear':
        this.forceUpdate()
        break
      case 'didDisappear':
        this.isVisible = false
        break
    }
  }
  shouldComponentUpdate = () => {
    return this.isVisible
  }

  render() {
    let {
      loading,
      handleBack,
      state,
      heading,
      searchApi,
      children,
    }: PropTypes = this.props
    return (
      <React.Fragment>
        <NavBar
          handleBack={handleBack}
          loading={loading}
          state={state}
          heading={heading}
        >
          {searchApi && <SearchField api={searchApi} />}
        </NavBar>
        <Sink>{children}</Sink>
      </React.Fragment>
    )
  }
}

export default Screen
