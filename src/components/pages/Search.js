// @flow
import React from 'react'
import { connect } from 'react-redux'
import { SearchField } from '../container'

import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemSearch,
  Heading,
  NavBar,
} from '../presentational/atoms'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

const Search = (props: PropTypes) => (
  <React.Fragment>
    <NavBar>
      <Heading color="black" size="xl" marginBottom>
        Search
      </Heading>
      <SearchField api="current-items" />
    </NavBar>
    <FlatListWrapper
      data={props.searchResults}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      renderItem={FlatListItemSearch}
    />
  </React.Fragment>
)

const mapStateToProps = state => ({
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
