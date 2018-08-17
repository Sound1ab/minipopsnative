// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'
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

const mapDispatchToProps = dispatch => ({
  removeFromFavourite: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FAVOURITE(payload))
  },
  addToWatchList: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.ADD_TO_WATCH_LIST(payload))
  },
  removeFromWatchList: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FROM_WATCH_LIST(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourites)
