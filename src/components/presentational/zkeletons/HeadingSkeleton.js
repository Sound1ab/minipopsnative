// @flow
import React from 'react'
import styled from 'styled-components'
import { Skeleton } from '../molecules'
import { Dimensions } from 'react-native'
import { colors } from '../../../theme'
import { GrowContainer } from '../atoms'

type PropTypes = {}

export const HeadingSkeleton = (props: PropTypes) => (
  <Skeleton
    height={27}
    width={150}
    layout={{
      heading: {
        type: 'rect',
        x: 0,
        y: 0,
        width: '100%',
        height: '100%',
      },
    }}
  />
)

HeadingSkeleton.defaultProps = {}

export default HeadingSkeleton
