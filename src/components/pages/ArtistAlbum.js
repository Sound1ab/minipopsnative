// @flow
import React from 'react'
import { connect } from 'react-redux'
import {
  GrowContainer,
  Spinner,
  NavBar,
  Heading,
  ImageWrapper,
} from '../presentational/atoms'
import { ActionBar, TrackRow } from '../presentational/molecules'
import { popScreen } from '../../navigation'
import { Dimensions, ScrollView } from 'react-native'
import {
  ArtistAlbumSkeleton,
  HeadingSkeleton,
} from '../presentational/skeletons'

type PropTypes = {
  artistAlbum: {
    artist: string,
    name: string,
    tracks: Array<string>,
    imageUrl: string,
    spotifyId: string,
  },
  favourites: Array<Object>,
  id: string,
  albumSpotifyId: string,
  addToFavourites: Function,
  removeFromFavourites: Function,
  loading: Boolean,
}

export const ArtistAlbum = (props: PropTypes) => {
  return (
    <React.Fragment>
      <NavBar handleBack={popScreen.bind(null, props.navigator)}>
        {props.loading && props.state === 'fetchingAlbum' ? (
          <HeadingSkeleton />
        ) : (
          <Heading color="black" size="l">
            {props.artistAlbum.album}
          </Heading>
        )}
      </NavBar>
      {props.loading && props.state === 'fetchingAlbum' ? (
        <ArtistAlbumSkeleton />
      ) : (
        <ScrollView>
          <ImageWrapper
            source={props.artistAlbum.imageBigUrl}
            height={Dimensions.get('window').width}
          />
          <ActionBar
            handleAddToFavourites={props.addToFavourites.bind(null, {
              id: props.id,
              item: props.artistAlbum,
            })}
            handleRemoveFromFavourites={props.removeFromFavourites.bind(null, {
              id: props.id,
              item: props.artistAlbum,
            })}
            isFavourite={props.favourites.find(
              favourite => favourite.spotifyId === props.albumSpotifyId,
            )}
          />
          {props.artistAlbum.tracks.map((track, index) => (
            <TrackRow key={track} index={index}>
              {`${index + 1}. `}
              {track}
            </TrackRow>
          ))}
        </ScrollView>
      )}
    </React.Fragment>
  )
}

ArtistAlbum.defaultProps = {
  artistAlbum: {
    artist: '',
    name: '',
    tracks: [],
    imageUrl: '',
    spotifyId: '',
  },
  favourites: [],
  id: '',
  albumSpotifyId: '',
  addToFavourites: () => {},
  removeFromFavourites: () => {},
  loading: false,
}

const mapStateToProps = state => ({
  artistAlbum: state.discovery.artistAlbum,
  favourites: state.discovery.favourites,
  id: state.login.cognitoUser.id,
  state: state.discovery.state,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistAlbum)
