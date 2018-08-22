// @flow
import React from 'react'
import styled, { css } from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'
import { Fade } from '../zanimations'

const Wrapper = styled.View`
  ${({ index }) =>
    index === 0 &&
    css`
      margin-top: 64px;
    `};
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').width};
  padding: 8px;
  background-color: ${colors.lightGray};
`

const ContentWrapper = styled.View`
  width: ${Dimensions.get('window').width};
  flex: 1;
  padding: 16px;
`

type PropTypes = {
  isVisible: boolean,
}

export const DiscoveryListSkeleton = ({ isVisible }: PropTypes) => (
  <Fade isVisible={isVisible}>
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
  </Fade>
)

DiscoveryListSkeleton.defaultProps = {
  isVisible: true,
}
