// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { NavBar } from '../molecules'

type PropTypes = {
  isModal: boolean,
  noLoading: Boolean,
  loading: Boolean,
  handleBack: ?Function,
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
    isModal: false,
    noLoading: false,
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
      isModal,
      noLoading,
      loading,
      handleBack,
      state,
      heading,
      children,
    }: PropTypes = this.props
    return (
      <React.Fragment>
        <NavBar
          isModal={isModal}
          noLoading={noLoading}
          handleBack={handleBack}
          loading={loading}
          heading={heading}
        />
        <Sink>{children}</Sink>
      </React.Fragment>
    )
  }
}

export default Screen
