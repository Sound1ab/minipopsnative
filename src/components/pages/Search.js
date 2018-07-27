// @flow
import React from 'react'
import { connect } from 'react-redux'
import SearchField from '../../components/container/SearchField'

import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemSearch,
  Heading,
  NavBar,
  Spinner,
} from '../presentational/atoms'

type PropTypes = {
  loading: Boolean,
  searchResults: Array<Object>,
}

const Search = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
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
  </GrowContainer>
)

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
