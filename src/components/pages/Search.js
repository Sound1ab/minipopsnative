// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SearchField from '../container/SearchField/SearchField'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemSearch,
  Heading,
  NavBar,
  Spinner,
} from '../presentational/atoms'

type PropTypes = {
  textInput: Function,
}

export class Search extends Component<PropTypes> {
  render() {
    const { searchResults } = this.props
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
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
  loading: state.app.loading,
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
