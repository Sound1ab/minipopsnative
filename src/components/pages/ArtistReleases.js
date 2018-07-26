// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { popScreen } from '../../navigation'
import { ScrollView } from 'react-native'
import {
  GrowContainer,
  NavBar,
  Heading,
  Spinner,
} from '../presentational/atoms'
import { ImageGrid } from '../presentational/molecules'
import { FAVOURITES_MACHINE_ACTIONS } from '../../machines/Favourites/actions'

type PropTypes = {}

export class ArtistReleases extends Component<PropTypes> {
  static defaultProps = {}

  componentDidMount() {
    this.props.fetchArtistReleases(this.props.spotifyId)
  }

  render() {
    return (
      <GrowContainer>
        <Spinner isVisible={this.props.loading} />
        <NavBar handleBack={popScreen.bind(null, this.props.navigator)}>
          <Heading color="black" font="l">
            Artist Releases
          </Heading>
        </NavBar>
        <ScrollView>
          <ImageGrid items={this.props.artistReleases[this.props.spotifyId]} />
        </ScrollView>
      </GrowContainer>
    )
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading,
  artistReleases: state.favourites.artistReleases,
})

const mapDispatchToProps = dispatch => ({
  fetchArtistReleases: spotifyId => {
    dispatch(FAVOURITES_MACHINE_ACTIONS.FETCH_RELEASES(spotifyId))
  },
})
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtistReleases)
