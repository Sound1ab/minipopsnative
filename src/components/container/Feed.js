// @flow
import React, { Component } from 'react'
import { adopt } from 'react-adopt'
import { connect } from 'react-redux'
import { readEBayByFavourites } from '../apollo'
import { LayoutAnimation } from 'react-native'
import { FeedListSkeleton } from '../presentational/zkeletons'

const ComposedQueries = adopt({
  readEBayByFavourites,
})

type PropTypes = {
  loading: Boolean,
  id: string,
  feed: Array<{}>,
  state: string | Object,
  fetchFeed: Function,
  refetchFeed: Function,
  isOnline: Boolean,
}

export class Feed extends Component<PropTypes> {
  static defaultProps = {
    loading: false,
    id: '',
    feed: [],
    state: '',
    fetchFeed: () => {},
    refetchFeed: () => {},
    isOnline: true,
  }
  // constructor(props) {
  //   super(props)
  //   nativeEventSubscription.subscribe(this.onNavigatorEvent)
  //   this.favouritesCopy = props.favourites
  // }
  // onNavigatorEvent = selectedTabIndex => {
  //   if (
  //     selectedTabIndex === 2 &&
  //     this.favouritesCopy !== this.props.favourites
  //   ) {
  //     this.fetchFeed()
  //     this.favouritesCopy = this.props.favourites
  //   }
  // }
  render() {
    return (
      <ComposedQueries userId={this.props.id}>
        {({ readEBayByFavourites: { loading, data } }) => {
          if (loading) {
            return <FeedListSkeleton />
          }
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          const { readEBayByFavourites: feed } = data
          return this.props.children({
            ...this.props,
            loading,
            feed,
          })
        }}
      </ComposedQueries>
    )
  }
}

const mapStateToProps = state => ({
  id: state.login.cognitoUser.id,
  isOnline: state.app.isOnline,
})

export default connect(mapStateToProps)(Feed)
