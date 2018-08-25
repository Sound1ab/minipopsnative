// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feedMachine } from '../../machines/Feed'
import { feed } from '../../machines/Feed/selectors'
import { nativeEventSubscription } from '../../helpers'
import { favourites } from '../../machines/Discovery'

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
  constructor(props) {
    super(props)
    nativeEventSubscription.subscribe(this.onNavigatorEvent)
    this.favouritesCopy = props.favourites
  }
  onNavigatorEvent = selectedTabIndex => {
    if (
      selectedTabIndex === 2 &&
      this.favouritesCopy !== this.props.favourites
    ) {
      this.fetchFeed()
      this.favouritesCopy = this.props.favourites
    }
  }
  componentDidMount() {
    this.fetchFeed()
  }
  fetchFeed() {
    this.props.fetchFeed({ id: this.props.id })
  }
  render() {
    const { loading, state } = this.props
    return this.props.children({
      ...this.props,
      loading: loading && state === 'fetchingFeed',
    })
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  id: state.login.cognitoUser.id,
  feed: feed(state),
  state: state.feed.state,
  isOnline: state.app.isOnline,
  favourites: favourites(state),
})

const mapDispatchToProps = () => ({
  fetchFeed: payload => {
    feedMachine.dispatchAction('FETCH_FEED', payload)
  },
  refetchFeed: payload => {
    feedMachine.dispatchAction('REFETCH_FEED', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed)
