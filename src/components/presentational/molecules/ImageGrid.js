// @flow
import React from 'react'
import styled from 'styled-components'
import chunk from 'lodash/chunk'
import { Dimensions } from 'react-native'
import { ImageWrapper } from '../atoms'

type PropTypes = {
  items: Array<string>,
}

const GridWrapper = styled.View`
  flex: 1;
`

const RowWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`

export const ImageGrid = (props: PropTypes) => (
  <GridWrapper>
    {chunk(props.items, 3).map((row, index) => (
      <RowWrapper key={index}>
        {row.map(item => (
          <ImageWrapper
            key={item.spotifyId}
            source={{ uri: item.imageUrl }}
            height={Dimensions.get('window').width / 3}
            width={'33%'}
          />
        ))}
      </RowWrapper>
    ))}
  </GridWrapper>
)

ImageGrid.defaultProps = {
  items: [],
}
