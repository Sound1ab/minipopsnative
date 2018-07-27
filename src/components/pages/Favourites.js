// @flow
import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import {
  GrowContainer,
  Heading,
  FavouritesRow,
  Spinner,
  NavBar,
} from '../presentational/atoms'

type PropTypes = {}

export const Favourites = (props: PropTypes) => (
  <GrowContainer>
    <Spinner isVisible={props.loading} />
    <NavBar>
      <Heading color="black" size="xl">
        Favourites
      </Heading>
    </NavBar>
    <ScrollView>
      {props.favourites.map(favourite => (
        <FavouritesRow
          key={`${favourite.artist}-${favourite.album}`}
          imageSource={favourite.imageUrl}
          artist={favourite.artist}
          album={favourite.album}
        />
      ))}
    </ScrollView>
  </GrowContainer>
)

Favourites.defaultProps = {}

const mapStateToProps = state => ({
  loading: state.app.loading,
  favourites: state.discovery.favourites,
})

// const mapDispatchToProps = dispatch => ({
//   fetchArtistReleases: spotifyId => {
//     dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_RELEASES(spotifyId))
//   },
// })

export default connect(mapStateToProps)(Favourites)
