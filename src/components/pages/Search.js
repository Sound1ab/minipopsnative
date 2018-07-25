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

const MOCK_ITEM = {
  imageUrl:
    'https://www.catster.com/wp-content/uploads/2017/12/A-gray-kitten-meowing.jpg',
  title: 'Test title',
  endTime: 'slkdmlsmf',
  price: '£5.67',
  postage: '£5.76',
}

const Search = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
    <NavBar>
      <Heading color="black" font="xl">
        Search
      </Heading>
      <SearchField api="current-items" />
    </NavBar>
    <FlatListItemSearch item={MOCK_ITEM} />
    {/*<FlatListWrapper*/}
    {/*data={props.searchResults}*/}
    {/*keyExtractor={(item, index) => `${item.title}-${index}`}*/}
    {/*renderItem={FlatListItemSearch}*/}
    {/*/>*/}
  </GrowContainer>
)

const mapStateToProps = state => ({
  loading: state.app.loading,
  searchResults: state.search.searchResults,
})

export default connect(mapStateToProps)(Search)
