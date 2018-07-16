// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { SearchField } from '../../presentational/molecules'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItem,
  ImageWrapper,
} from '../../presentational/atoms'
import { connect } from 'react-redux'
import { SEARCH_MACHINE } from './actions'

type PropTypes = {
  textInput: Function,
}

export class Search extends Component<PropTypes, StateTypes> {
  static defaultProps = {
    textInput: () => {},
  }
  constructor(props: PropTypes) {
    super(props)
  }

  handleChange = value => {
    console.log(this)
    this.props.textInput(value)
  }

  render() {
    const { searchValue, results } = this.props
    return (
      <GrowContainer>
        <FlatListWrapper
          ListHeaderComponent={() => (
            <SearchField
              handleChange={this.handleChange}
              value={searchValue}
              placeholder="The Cure"
            />
          )}
          data={results}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItem}
        />
        {/*<ImageWrapper />*/}
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  searchValue: state.search.value,
  results: state.search.results,
})

const mapDispatchToProps = dispatch => ({
  textInput: value => {
    dispatch(SEARCH_MACHINE.TEXT_INPUT(value))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search)
