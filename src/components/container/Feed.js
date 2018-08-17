// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FEED_MACHINE_ACTIONS } from '../../machines/Feed/actions'
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
  constructor(props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
    this.isVisible = false
  }
  onNavigatorEvent = event => {
    switch (event.id) {
      case 'willAppear':
        this.isVisible = true
        break
      case 'didAppear':
        this.props.fetchFeed({ id: this.props.id })
        break
      case 'didDisappear':
        this.isVisible = false
        break
    }
  }
  shouldComponentUpdate = () => {
    return this.isVisible
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

const mapDispatchToProps = dispatch => ({
  fetchFeed: payload => {
    dispatch(FEED_MACHINE_ACTIONS.FETCH_FEED(payload))
  },
  refetchFeed: payload => {
    dispatch(FEED_MACHINE_ACTIONS.REFETCH_FEED(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed)
