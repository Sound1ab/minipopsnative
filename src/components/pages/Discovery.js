// @flow
import React, { Component } from 'react'
import { Functional } from '../../helpers/functional'
import { connect } from 'react-redux'
import SearchField from '../../components/container/SearchField'
import { pushScreen } from '../../navigation'
import { Skeleton } from '../presentational/molecules'
import {
  FlatListWrapper,
  GrowContainer,
  FlatListItemDiscovery,
  Heading,
  NavBar,
  Spinner,
} from '../presentational/atoms'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Discovery/actions'

type PropTypes = {
  discoveryResults: Array<Object>,
}

class Discovery extends Component<PropTypes> {
  fetchArtistAlbum = item => {
    this.props.fetchArtistAlbum({ spotifyId: item.spotifyId })
    return item
  }
  handlePushArtistAlbum = ({ spotifyId, title }) => {
    pushScreen({
      navigator: this.props.navigator,
      screen: 'ArtistAlbum',
      passProps: {
        albumSpotifyId: spotifyId,
        title,
        addToFavourites: this.props.addToFavourites,
        removeFromFavourites: this.props.removeFromFavourites,
      },
    })
  }
  fetchArtistReleases = item => {
    this.props.fetchArtistReleases({ spotifyId: item.spotifyId })
    return item
  }
  handlePushArtistReleases = ({ spotifyId, title }) => {
    pushScreen({
      navigator: this.props.navigator,
      screen: 'ArtistReleases',
      passProps: {
        artistSpotifyId: spotifyId,
        title,
        handlePushArtistAlbum: Functional.compose(
          this.handlePushArtistAlbum,
          this.fetchArtistAlbum,
        ),
      },
    })
  }
  render() {
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <NavBar>
          <Heading color="black" size="xl" marginBottom>
            Discovery
          </Heading>
          <SearchField api="related-artists" />
        </NavBar>
        <FlatListWrapper
          data={this.props.discoveryResults}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={renderProps => (
            <FlatListItemDiscovery
              {...renderProps}
              handlePushArtistReleases={Functional.compose(
                this.handlePushArtistReleases,
                this.fetchArtistReleases,
              )}
            />
          )}
        />
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  discoveryResults: state.search.discoveryResults,
  artistReleases: state.discovery.artistReleases,
})

const mapDispatchToProps = dispatch => ({
  fetchArtistReleases: spotifyId => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_RELEASES(spotifyId))
  },
  fetchArtistAlbum: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_ALBUM(payload))
  },
  addToFavourites: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.ADD_FAVOURITE(payload))
  },
  removeFromFavourites: payload => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.REMOVE_FAVOURITE(payload))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Discovery)
