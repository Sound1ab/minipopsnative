// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Heading } from '../atoms'
import { colors, shadow } from '../../../theme'

type PropTypes = {
  index: number,
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px 8px 4px 8px' : '0 8px 4px 8px'};
  padding: 16px;
  background-color: white;
  ${shadow.map(
    ({ property, value }) =>
      css`
        ${property}: ${value};
      `,
  )};
`

export const TrackRow = (props: PropTypes) => (
  <Wrapper index={props.index}>
    <Heading size="s" color="black">
      {props.children}
    </Heading>
  </Wrapper>
)

TrackRow.defaultProps = {
  index: 0,
}
