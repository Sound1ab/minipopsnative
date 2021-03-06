// @flow
import React from 'react'
import styled from 'styled-components'
import { Heading } from './Heading'

type PropTypes = {
  index: number,
}

const Wrapper = styled.View`
  flex: 1;
  justify-content: flex-start;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '16px 16px 0 16px' : '0 16px 4px 16px'};
  padding: 16px 0;
  background-color: ${({ theme }) => theme.background};
`

export const TrackRow = (props: PropTypes) => (
  <Wrapper index={props.index}>
    <Heading size="s">{props.children}</Heading>
  </Wrapper>
)

TrackRow.defaultProps = {
  index: 0,
}
