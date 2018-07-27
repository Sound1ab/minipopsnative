// @flow
import React from 'react'
import { connect } from 'react-redux'
import SearchField from '../../components/container/SearchField'
import { Skeleton } from '../presentational/molecules'

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
    <Skeleton
      layout={{
        rect: {
          x: 0,
          y: 0,
          rx: 3,
          ry: 3,
          width: 70,
          height: 10,
        },
      }}
    />
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
