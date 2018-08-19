// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { discoveryMachine } from '../../machines/Discovery'
import { favourites, watchList } from '../../machines/Discovery/selectors'

type PropTypes = {
  removeFromFavourite: Function,
  addToWatchList: Function,
  removeFromWatchList: Function,
  watchListIds: Array<string>,
}

export class Favourites extends Component<PropTypes> {
  static defaultProps = {}
  render() {
    return this.props.children(this.props)
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  favourites: favourites(state),
  watchListIds: watchList(state),
  id: state.login.cognitoUser.id,
  state: state.app.state,
})

const mapDispatchToProps = () => ({
  removeFromFavourite: payload => {
    discoveryMachine.dispatchAction('REMOVE_FAVOURITE', payload)
  },
  addToWatchList: payload => {
    discoveryMachine.dispatchAction('ADD_TO_WATCH_LIST', payload)
  },
  removeFromWatchList: payload => {
    discoveryMachine.dispatchAction('REMOVE_FROM_WATCH_LIST', payload)
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourites)
