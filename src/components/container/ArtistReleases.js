// @flow
import React from 'react'
import { connect } from 'react-redux'
import { artistReleases } from '../../machines/Discovery/selectors'

type PropTypes = {
  artistReleases: Object,
  state: string | Object,
  loading: Boolean,
}

const ArtistReleases = (props: PropTypes) => props.children(props)

ArtistReleases.defaultProps = {
  artistReleases: [],
  state: '',
  loading: false,
}

const mapStateToProps = state => ({
  artistReleases: artistReleases(state),
  state: state.discovery.state,
  loading: state.app.loading,
})

export default connect(mapStateToProps)(ArtistReleases)
