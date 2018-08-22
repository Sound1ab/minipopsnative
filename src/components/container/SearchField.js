// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { InputWrapper, Icon } from '../presentational/atoms/index'
import { colors } from '../../theme'

const Wrapper = styled.View`
  width: 100%;
  padding: 16px;
`

const RelativeWrapper = styled.View``

type PropTypes = {
  searchInput: Function,
  searchEmpty: Function,
  api: string,
  isOnline: Boolean,
  searchValue: string,
}

// TODO: Move out of container folder
export class SearchField extends Component<PropTypes> {
  static defaultProps = {
    searchInput: () => {},
    searchEmpty: () => {},
    api: 'current-items',
    isOnline: true,
    searchValue: '',
  }

  handleChange = value => {
    const { searchInput, searchEmpty, api } = this.props
    if (value) {
      searchInput({ value, api })
    } else {
      searchEmpty(value)
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
            value={this.props.searchValue}
            handleChange={this.handleChange}
            placeholder="The Cure"
            disabled={!this.props.isOnline}
          />
        </RelativeWrapper>
      </Wrapper>
    )
  }
}

export default SearchField
