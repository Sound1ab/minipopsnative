// @flow
import React, { Component } from 'react'
import { adopt } from 'react-adopt'
import { READ_FAVOURITES, READ_WATCHING } from '../../graphQL'
import {
  readFavourites,
  deleteFavourites,
  readWatching,
  deleteWatching,
  updateWatching,
} from '../apollo'
import { LayoutAnimation } from 'react-native'
import { connect } from 'react-redux'
import { FavouritesListSkeleton } from '../presentational/zkeletons'

type PropTypes = {
  removeFromFavourite: Function,
  addToWatchList: Function,
  removeFromWatchList: Function,
  watchListIds: Array<string>,
}

const ComposedQueries = adopt({
  readFavourites,
  deleteFavourites,
  readWatching,
  updateWatching,
  deleteWatching,
})

export class Favourites extends Component<PropTypes> {
  render() {
    return (
      <ComposedQueries userId={this.props.id}>
        {({
          readFavourites: { data: favouritesData, loading: favouritesLoading },
          readWatching: { data: watchingData, loading: watchingLoading },
          updateWatching: { updateWatching },
          deleteWatching: { deleteWatching },
          deleteFavourites: { deleteFavourites },
        }) => {
          if (favouritesLoading || watchingLoading) {
            return <FavouritesListSkeleton />
          }
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
          const favourites =
            favouritesData[READ_FAVOURITES.definition].favourites
          const watching =
            (watchingData &&
              watchingData[READ_WATCHING.definition] &&
              watchingData[READ_WATCHING.definition].watching) ||
            []
          return this.props.children({
            ...this.props,
            favourites,
            watching,
            updateWatching,
            deleteWatching,
            deleteFavourites,
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

export default connect(mapStateToProps)(Favourites)
