// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
import { connect } from 'react-redux'
import SearchField from '../container/SearchField/SearchField'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemSearch,
  Heading,
  NavBar,
} from '../presentational/atoms'

type PropTypes = {
  textInput: Function,
}

export class Search extends Component<PropTypes> {
  render() {
    const { searchResults } = this.props
    return (
      <GrowContainer>
        <NavBar>
          <Heading color="black" font="xl">
            Search
          </Heading>
          <SearchField api="current-items" />
        </NavBar>
        <FlatListWrapper
          data={searchResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItemSearch}
        />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
