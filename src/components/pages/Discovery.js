// @flow
import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'
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
  textInput: Function,
}

export class Discovery extends Component<PropTypes> {
  render() {
    const { discoveryResults } = this.props
    return (
      <GrowContainer>
        <NavBar>
          <Heading color="black" font="xl">
            Discovery
          </Heading>
          <SearchField api="related-artists" />
        </NavBar>
        <FlatListWrapper
          data={discoveryResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={FlatListItemDiscovery}
        />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  discoveryResults: state.search.discoveryResults,
})

export default connect(mapStateToProps)(Discovery)
