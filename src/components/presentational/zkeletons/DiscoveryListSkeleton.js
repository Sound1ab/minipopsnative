// @flow
import React from 'react'
import { View } from 'react-native'
import styled, { css } from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'

const Wrapper = styled.View`
  ${({ index }) =>
    index === 0 &&
    css`
      margin-top: 64px;
    `};
  width: ${Dimensions.get('window').width};
  height: 300;
  padding: 8px;
  background-color: ${({ theme }) => theme.background};
`

export const DiscoveryListSkeleton = () => (
  <View>
    {Array(2)
      .fill(1, 0)
      .map((v, i) => (
        <Wrapper key={`${v}-${i}`} index={i}>
          <Skeleton
            height={Dimensions.get('window').width}
            width={'100%'}
            layout={{
              image: {
                type: 'rect',
                x: 0,
                y: 0,
                height: '100%',
                width: '100%',
              },
            }}
          />
        </Wrapper>
      ))}
  </View>
)
