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
    {chunk(Object.values(props.items), 3).map(row => (
      <RowWrapper key={`${row[0][0].spotifyId}`}>
        {row.map(item => (
          <TouchableOpacity
            activeOpacity={1}
            key={item[0].spotifyId}
            onPress={props.handlePress.bind(null, item[0])}
          >
            <ImageWrapper
              source={item[0].imageMediumUrl}
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
  handlePress: () => {},
}
