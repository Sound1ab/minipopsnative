// @flow
import React from 'react'
import { connect } from 'react-redux'
import SearchField from '../container/SearchField/SearchField'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemDiscovery,
  Heading,
  NavBar,
} from '../presentational/atoms'

type PropTypes = {
  discoveryResults: Array<Object>,
}

const Discovery = (props: PropTypes) => (
  <GrowContainer>
    <NavBar>
      <Heading color="black" font="xl">
        Discovery
      </Heading>
      <SearchField api="related-artists" />
    </NavBar>
    <FlatListWrapper
      data={props.discoveryResults}
      keyExtractor={(item, index) => `${item.title}-${index}`}
      renderItem={props => <FlatListItemDiscovery {...props} />}
    />
  </GrowContainer>
)

const mapStateToProps = state => ({
  discoveryResults: state.search.discoveryResults,
})

export default connect(mapStateToProps)(Discovery)
