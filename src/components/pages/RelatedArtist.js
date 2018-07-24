// @flow
import React from 'react'
import styled from 'styled-components'
import { dismissModal } from '../../navigation'
import { GrowContainer } from '../presentational/atoms'

const View = styled.View``
const Text = styled.Text``
const TouchableOpacity = styled.TouchableOpacity``

type PropTypes = {}

export const RelatedArtist = (props: PropTypes) => (
  <GrowContainer justifyContent="center" alignItems="center">
    <TouchableOpacity onPress={dismissModal}>
      <Text>Hey</Text>
    </TouchableOpacity>
  </GrowContainer>
)

RelatedArtist.defaultProps = {}

export default RelatedArtist
