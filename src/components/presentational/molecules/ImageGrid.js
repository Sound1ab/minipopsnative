// @flow
import React from 'react'
import styled from 'styled-components'
import chunk from 'lodash/chunk'
import { Dimensions } from 'react-native'
import { ImageWrapper } from '../atoms'

type PropTypes = {
  items: Array<string>,
  handlePress: ?Function,
}

const GridWrapper = styled.View`
  flex: 1;
`

const RowWrapper = styled.View`
  flex: 1;
  flex-direction: row;
`

const TouchableOpacity = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  width: 100%;
`

export const ImageGrid = (props: PropTypes) => (
  <GridWrapper>
    {chunk(props.items, 3).map((row, index) => (
      <RowWrapper key={index}>
        {row.map(item => (
          <TouchableOpacity
            key={item.spotifyId}
            onPress={props.handlePress.bind(null, item.spotifyId)}
          >
            <ImageWrapper
              source={{ uri: item.imageUrl }}
              height={Dimensions.get('window').width / 3}
              width={'33%'}
              handlePress={props.handlePress}
            />
          </TouchableOpacity>
        ))}
      </RowWrapper>
    ))}
  </GridWrapper>
)

ImageGrid.defaultProps = {
  items: [],
  handlePress: null,
}
