// @flow
import React from 'react'
import { connect } from 'react-redux'

type PropTypes = {
  title: String,
  navigator: Object,
  artistSpotifyId: String,
  loading: Boolean,
  artistReleases: Array<Object>,
  handlePushArtistAlbum: Function,
  fetchMoreArtistReleases: Function,
}

const ArtistReleases = (props: PropTypes) => props.children(props)

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
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistReleases)
