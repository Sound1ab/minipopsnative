// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'

export const IMAGE_WIDTH = Dimensions.get('window').width / 2.5

const Wrapper = styled.View`
  z-index: 999;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_WIDTH + 60};
  background-color: ${colors.lightGray};
`

export const SliderSkeleton = () => (
  <Wrapper>
    <Skeleton
      height={'100%'}
      width={'100%'}
      layout={{
        heading: {
          type: 'rect',
          x: 0,
          y: 0,
          width: '100%',
          height: IMAGE_WIDTH,
        },
      }}
    />
  </Wrapper>
)
