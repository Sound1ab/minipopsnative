// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { MinipopsIcon } from '../atoms'
import { Dimensions } from 'react-native'

export const IMAGE_WIDTH = Dimensions.get('window').width / 2.5

const Wrapper = styled.View`
  z-index: 999;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_WIDTH + 60};
  background-color: ${({ theme }) => theme.lightGray};
  margin-left: 16px;
`

const BlankWrapper = styled.View`
  width: 100%;
  height: ${IMAGE_WIDTH};
  background-color: ${({ theme }) => theme.gray};
  justify-content: center;
  align-items: center;
`

export const SliderSkeleton = ({ loading }) => (
  <Wrapper>
    {loading ? (
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
    ) : (
      <BlankWrapper>
        <MinipopsIcon size={30} />
      </BlankWrapper>
    )}
  </Wrapper>
)
