// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'

const OuterWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
`

const Wrapper = styled.View`
  padding-top: 8px;
  flex: 1;
  width: ${Dimensions.get('window').width};
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${colors.lightGray};
`

const Album = styled.View`
  padding: ${({ index }) =>
    index % 2 === 0 ? '0 8px 8px 4px' : '0 4px 8px 8px'};
  width: ${Dimensions.get('window').width / 2};
  height: ${Dimensions.get('window').width / 2};
`

export const ImageGridSkeleton = () => (
  <OuterWrapper>
    <Wrapper>
      {Array(8)
        .fill(1, 0)
        .map((v, i) => (
          <Album key={i} index={i + 1}>
            <Skeleton
              height={'100%'}
              width={'100%'}
              layout={{
                heading: {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  height: '100%',
                  width: '100%',
                },
              }}
            />
          </Album>
        ))}
    </Wrapper>
  </OuterWrapper>
)
