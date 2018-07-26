// @flow
import React, { Component } from 'react'
import styled from 'styled-components'
import { GrowContainer, Heading } from '../presentational/atoms'

type PropTypes = {}

type StateTypes = {}

export class ArtistRelease extends Component<PropTypes, StateTypes> {
  static defaultProps = {}
  constructor(props: PropTypes) {
    super(props)
  }
  state = {}

  render() {
    return (
      <GrowContainer justifyContent="center" alignItems="center">
        <Heading>Artist Release</Heading>
      </GrowContainer>
    )
  }
}

export default ArtistRelease
