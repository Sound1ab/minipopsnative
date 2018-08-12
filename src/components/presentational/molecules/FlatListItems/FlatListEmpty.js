// @flow
import React from 'react'
import styled from 'styled-components'

const TextStyled = styled.Text`
  margin: 16px;
  color: black;
`

export const FlatListEmpty = () => (
  <TextStyled>Use the search field to find some records</TextStyled>
)

FlatListEmpty.defaultProps = {}
