// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'
import { GrowContainer } from '../atoms'

const Wrapper = styled.View`
  flex: 0;
  width: ${Dimensions.get('window').width - 16};
  flex-basis: 100;
  margin: ${({ index }) =>
    parseInt(index) === parseInt(0) ? '8px' : '0 8px 8px 8px'};
  background-color: ${colors.lightGray};
`

type PropTypes = {
  index: number,
}

export const FavouritesListSkeleton = (props: PropTypes) => (
  <GrowContainer>
    {Array(3)
      .fill(1, 0)
      .map((v, i) => (
        <Wrapper key={`${v}-${i}`} index={i}>
          <Skeleton
            height={'100%'}
            width={'100%'}
            layout={{
              image: {
                type: 'rect',
                x: 0,
                y: 0,
                height: '100%',
                width: 100,
              },
              heading: {
                type: 'rect',
                x: 108,
                y: 20,
                height: 30,
                width: 150,
              },
              subheading: {
                type: 'rect',
                x: 108,
                y: 58,
                height: 25,
                width: 100,
              },
            }}
          />
        </Wrapper>
      ))}
  </GrowContainer>
)

FavouritesListSkeleton.defaultProps = {
  index: 0,
}

export default FavouritesListSkeleton
