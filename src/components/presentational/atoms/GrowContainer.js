// @flow
import React from 'react'
import styled from 'styled-components'

const ViewWrapper = styled.View`
  flex: 1;
`

type Props = {}

export const GrowContainer = (props: Props) => (
  <ViewWrapper>{props.children}</ViewWrapper>
)

GrowContainer.defaultProps = {}
