// @flow
import React from 'react'
import { Skeleton } from '../molecules'

export const HeadingSkeleton = () => (
  <Skeleton
    height={35}
    width={'100%'}
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
