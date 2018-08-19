// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { feedMachine } from '../../machines/Feed'
import { feed } from '../../machines/Feed/selectors'

type PropTypes = {
  loading: Boolean,
  id: string,
  feed: Array<{}>,
  state: string | Object,
  fetchFeed: Function,
  refetchFeed: Function,
}

export class Feed extends Component<PropTypes> {
  static defaultProps = {
    loading: false,
    id: '',
    feed: [],
    state: '',
    fetchFeed: () => {},
    refetchFeed: () => {},
  }
  componentDidMount() {
    this.props.fetchFeed({ id: this.props.id })
  }
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  id: state.login.cognitoUser.id,
  feed: feed(state),
  state: state.feed.state,
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
