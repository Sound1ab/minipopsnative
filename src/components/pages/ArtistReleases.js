// @flow
import React from 'react'
import { connect } from 'react-redux'
import { popScreen, pushScreen } from '../../navigation'
import { ScrollView } from 'react-native'
import {
  GrowContainer,
  Heading,
  NavBar,
  Spinner,
  ScrollViewWrapper,
} from '../presentational/atoms'
import { ImageGrid } from '../presentational/molecules'
import { ImageGridSkeleton } from '../presentational/skeletons'

type PropTypes = {
  title: String,
  navigator: Object,
  artistSpotifyId: String,
  loading: Boolean,
  artistReleases: Array<Object>,
  handlePushArtistAlbum: Function,
  fetchMoreArtistReleases: Function,
}

export function ArtistReleases(props: PropTypes) {
  return (
    <React.Fragment>
      <NavBar handleBack={popScreen.bind(null, props.navigator)}>
        <Heading color="black" size="l">
          {props.title}
        </Heading>
      </NavBar>
      <ScrollViewWrapper
        onEndReached={props.fetchMoreArtistReleases.bind(null, {
          spotifyId: props.artistSpotifyId,
        })}
      >
        {props.loading && props.state === 'fetchingReleases' ? (
          <ImageGridSkeleton />
        ) : (
          <ImageGrid
            handlePress={props.handlePushArtistAlbum}
            items={props.artistReleases}
          />
        )}
      </ScrollViewWrapper>
    </React.Fragment>
  )
}

ArtistReleases.defaultProps = {
  title: '',
  navigator: {},
  artistSpotifyId: '',
  loading: false,
  artistReleases: {},
  handlePushArtistAlbum: () => {},
  fetchMoreArtistReleases: () => {},
}

const mapStateToProps = state => ({
  artistReleases: state.discovery.artistReleases,
  state: state.discovery.state,
})

export default connect(mapStateToProps)(ArtistReleases)
