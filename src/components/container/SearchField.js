// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { InputWrapper, Icon } from '../presentational/atoms/index'
import { connect } from 'react-redux'
import { searchMachine } from '../../machines/SearchField'
import { colors } from '../../theme'

const Wrapper = styled.View`
  width: 100%;
`

const RelativeWrapper = styled.View``

type PropTypes = {
  handleChange: Function,
  textInputEmpty: Function,
  value: string,
  api: string,
  isOnline: Boolean,
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
            color={this.props.isOnline ? colors.primary : colors.gray}
          />
          <InputWrapper
            search
            handleChange={this.handleChange}
            placeholder="The Cure"
            disabled={!this.props.isOnline}
          />
        </RelativeWrapper>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  searchValue: state.search.value,
  isOnline: state.app.isOnline,
})

const mapDispatchToProps = () => ({
  textInput: (value, api) => {
    searchMachine.dispatchAction('TEXT_INPUT', { value, api })
  },
  textInputEmpty: () => {
    searchMachine.dispatchAction('TEXT_INPUT_EMPTY', { value: null })
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchField)
