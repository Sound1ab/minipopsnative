// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading } from '../atoms'
import { colors } from '../../../Theme'

type PropTypes = {}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  border-bottom-color: ${colors.gray};
  border-bottom-width: 1px;
  padding: 8px 16px;
`

export const TrackRow = (props: PropTypes) => (
  <Wrapper>
    <Heading size="s" color="black">
      {props.children}
    </Heading>
  </Wrapper>
)

TrackRow.defaultProps = {}
