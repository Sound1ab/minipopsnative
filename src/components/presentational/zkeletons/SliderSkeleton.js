// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Icon } from '../atoms'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'

export const IMAGE_WIDTH = Dimensions.get('window').width / 2.5

const Wrapper = styled.View`
  z-index: 999;
  width: ${IMAGE_WIDTH};
  height: ${IMAGE_WIDTH + 60};
  background-color: ${colors.lightGray};
  margin-left: 8px;
`

const BlankWrapper = styled.View`
  width: 100%;
  height: ${IMAGE_WIDTH};
  background-color: ${colors.gray};
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
        <Icon name="ios-close-circle-outline" />
      </BlankWrapper>
    )}
  </Wrapper>
)
