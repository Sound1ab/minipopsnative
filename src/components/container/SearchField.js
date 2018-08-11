// @flow
import React, { Component } from 'react'
import { InputWrapper, Icon } from '../presentational/atoms/index'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { SEARCH_MACHINE } from '../../machines/SearchField/actions'

const Wrapper = styled.View`
  width: 100%;
`

const RelativeWrapper = styled.View``

type PropTypes = {
  handleChange: Function,
  textInputEmpty: Function,
  value: string,
  api: string,
}

export class SearchField extends Component<PropTypes> {
  static defaultProps = {
    textInput: () => {},
    textInputEmpty: () => {},
    api: 'current-items',
  }

  handleChange = value => {
    const { textInput, textInputEmpty, api } = this.props
    if (value) {
      textInput(value, api)
    } else {
      textInputEmpty(value)
    }
  }

  render() {
    return (
      <Wrapper>
        <RelativeWrapper>
          <Icon
            name="ios-search"
            position="absolute"
            top="5px"
            left="16px"
            size={20}
            color="#e24347"
          />
          <InputWrapper
            search
            handleChange={this.handleChange}
            placeholder="The Cure"
          />
        </RelativeWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  searchValue: state.search.value,
})

const mapDispatchToProps = dispatch => ({
  textInput: (value, api) => {
    dispatch(SEARCH_MACHINE.TEXT_INPUT({ value, api }))
  },
  textInputEmpty: () => {
    dispatch(SEARCH_MACHINE.TEXT_INPUT_EMPTY({ value: null }))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchField)
