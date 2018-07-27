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
} from '../presentational/atoms'
import { ImageGrid } from '../presentational/molecules'

type PropTypes = {
  title: String,
  navigator: Object,
  artistSpotifyId: String,
  loading: Boolean,
  artistReleases: Array<Object>,
  handlePushArtistAlbum: Function,
}

export function ArtistReleases(props: PropTypes) {
  return (
    <GrowContainer>
      <Spinner isVisible={props.loading} />
      <NavBar handleBack={popScreen.bind(null, props.navigator)}>
        <Heading color="black" size="l">
          {props.title}
        </Heading>
      </NavBar>
      <ScrollView>
        <ImageGrid
          handlePress={props.handlePushArtistAlbum}
          items={props.artistReleases}
        />
      </ScrollView>
    </GrowContainer>
  )
}

ArtistReleases.defaultProps = {
  title: '',
  navigator: {},
  artistSpotifyId: '',
  loading: false,
  artistReleases: [],
  handlePushArtistAlbum: () => {},
}

const mapStateToProps = state => ({
  artistReleases: state.discovery.artistReleases,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistReleases)
