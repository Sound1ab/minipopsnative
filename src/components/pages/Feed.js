// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  GrowContainer,
  Heading,
  Spinner,
  NavBar,
  FlatListWrapper,
  FlatListItemSearch,
} from '../presentational/atoms'
import { FeedListSkeleton } from '../presentational/skeletons'

import { FEED_MACHINE_ACTIONS } from '../../machines/Feed/actions'

type PropTypes = {}

export class Feed extends Component<PropTypes> {
  static defaultProps = {}
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.fetchFeed({ id: this.props.id })
  }

  render() {
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <NavBar>
          <Heading color="black" size="xl">
            Feed
          </Heading>
        </NavBar>
        {this.props.loading && this.props.state === 'fetchingFeed' ? (
          <FeedListSkeleton />
        ) : (
          <FlatListWrapper
            data={this.props.feed}
            keyExtractor={(item, index) => `${item.title}-${index}`}
            renderItem={FlatListItemSearch}
          />
        )}
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  id: state.login.cognitoUser.id,
  feed: state.feed.feed,
  state: state.feed.state,
})

const mapDispatchToProps = dispatch => ({
  fetchFeed: payload => {
    dispatch(FEED_MACHINE_ACTIONS.FETCH_FEED(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed)
