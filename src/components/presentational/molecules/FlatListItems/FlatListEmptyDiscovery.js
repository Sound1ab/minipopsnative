// @flow
import React from 'react'
import styled from 'styled-components'

const TextStyled = styled.Text`
  margin: 0 16px 16px 16px;
  color: black;
`

export const FlatListEmpty = () => (
  <TextStyled>Use the search field to get started 🤙</TextStyled>
)

FlatListEmpty.defaultProps = {}
