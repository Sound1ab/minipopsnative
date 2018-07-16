// @flow
import React from 'react'
import styled from 'styled-components'

type Props = {}

const TextStyled = styled.Text`
  margin: 16px;
  color: black;
`

export const FlatListEmpty = (props: Props) => (
  <TextStyled>Use the search field to find some records</TextStyled>
)

FlatListEmpty.defaultProps = {}
