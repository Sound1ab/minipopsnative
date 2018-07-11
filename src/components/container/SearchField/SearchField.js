// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Input } from '../../presentational/atoms'
import { SEARCH_MACHINE } from './actions'

type PropTypes = {
  textInput: Function,
}

type StateTypes = {}

class SearchField extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    textInput: () => {},
  }
  constructor(props: PropTypes) {
    super(props)
  }

  render() {
    console.log(this.props)
    return (
      <Input handleChange={this.props.textInput} value={this.props.value} />
    )
  }
}

const mapStateToProps = state => ({
  value: state.search.value,
})

const mapDispatchToProps = dispatch => ({
  textInput: value => {
    dispatch(SEARCH_MACHINE.TEXT_INPUT(value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchField)
