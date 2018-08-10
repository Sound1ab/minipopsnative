// @flow
import React from 'react'
import { connect } from 'react-redux'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'

type PropTypes = {
  removeFromFavourite: Function,
  addToWatchList: Function,
  removeFromWatchList: Function,
  watchListIds: Array<string>,
}

export const Favourites = (props: PropTypes) => props.children(props)

Favourites.defaultProps = {}

const mapStateToProps = state => ({
  loading: state.app.loading,
  favourites: state.discovery.favourites,
  watchListIds: state.discovery.watchList.ids,
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