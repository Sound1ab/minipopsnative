// @flow
import React from 'react'
import styled, { css } from 'styled-components'

const ViewWrapper = styled.View`
  flex: 1;
  ${({ justifyContent }) =>
    justifyContent &&
    css`
      justify-content: ${justifyContent};
    `} ${({ alignItems }) =>
    alignItems &&
    css`
      align-items: ${alignItems};
    `};
`

type Props = {
  justifyContent: Boolean,
  alignItems: Boolean,
}

export const GrowContainer = (props: Props) => (
  <ViewWrapper
    justifyContent={props.justifyContent}
    alignItems={props.alignItems}
  >
    {props.children}
  </ViewWrapper>
)

GrowContainer.defaultProps = {
  justifyContent: null,
  alignItems: null,
}
